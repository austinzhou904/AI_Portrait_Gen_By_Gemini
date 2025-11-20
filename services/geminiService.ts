import { GoogleGenAI, Modality } from "@google/genai";
import { AspectRatio } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePortrait = async (
  referenceImageBase64: string,
  prompt: string,
  ratio: AspectRatio
): Promise<string> => {
  const ai = getClient();

  // Clean the base64 string if it has the data prefix
  const base64Data = referenceImageBase64.split(',')[1] || referenceImageBase64;

  // Construct a robust system prompt to enforce constraints
  // Note: Gemini 2.5 Flash Image doesn't support explicit aspect ratio config in the same way Imagen does,
  // so we reinforce it heavily in the prompt.
  const fullPrompt = `
    Task: Generate a high-quality, photorealistic portrait based on the attached reference image.
    
    Constraints:
    1. IDENTITY CONSISTENCY: You MUST preserve the facial features, identity, and likeness of the person in the reference image. The generated face must look exactly like the person provided.
    2. ASPECT RATIO: The output image MUST have an aspect ratio of ${ratio}.
    3. RESOLUTION: High resolution, extremely detailed, long edge approx 2048px quality.
    
    Style & Scene Description:
    ${prompt}
    
    Ensure the lighting and composition matches the requested style while keeping the subject's identity intact.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG/JPEG, API handles standard types
              data: base64Data,
            },
          },
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts || parts.length === 0) {
      throw new Error("No image generated.");
    }

    // Handle the image response
    for (const part of parts) {
      if (part.inlineData) {
        const base64ImageBytes = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }

    throw new Error("Unexpected response format: No inline image data found.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image");
  }
};