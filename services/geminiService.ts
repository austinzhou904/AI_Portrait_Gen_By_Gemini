import { GoogleGenAI, Modality } from "@google/genai";
import { AspectRatio, AppMode } from "../types";
import { GenerationContext, GenerationStrategy } from "./strategies/types";
import { FaceSwapStrategy } from "./strategies/faceSwap";
import { StyleTransferStrategy } from "./strategies/styleTransfer";
import { FashionStrategy } from "./strategies/fashion";
import { AgeTransformStrategy } from "./strategies/ageTransform";
import { HairstyleStrategy } from "./strategies/hairstyle";
import { TattooStrategy } from "./strategies/tattoo";
import { PhotographyStrategy } from "./strategies/photography";
import { SceneGenStrategy } from "./strategies/sceneGen";
import { PortraitStrategy } from "./strategies/portrait";
import { HanfuStrategy } from "./strategies/hanfu";
import { TravelStrategy } from "./strategies/travel";

const getClient = () => {
  console.log('[DEBUG] API Key Check:');
  console.log('  import.meta.env.VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY ? 'EXISTS' : 'UNDEFINED');
  console.log('  process.env.GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'EXISTS' : 'UNDEFINED');
  console.log('  process.env.API_KEY:', process.env.API_KEY ? 'EXISTS' : 'UNDEFINED');

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    console.error("Missing API Key. Checked: VITE_GEMINI_API_KEY, GEMINI_API_KEY, API_KEY");
    console.error("All import.meta.env:", import.meta.env);
    throw new Error("GEMINI_API_KEY is not defined in environment variables. Please check your .env file.");
  }

  console.log('[DEBUG] Using API key from:',
    import.meta.env.VITE_GEMINI_API_KEY ? 'VITE_GEMINI_API_KEY' :
      process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY' : 'API_KEY');

  return new GoogleGenAI({ apiKey });
};

// Strategy Registry
const strategies: Record<string, GenerationStrategy> = {
  'portrait': new PortraitStrategy(),
  'faceswap': new FaceSwapStrategy(),
  'style_transfer': new StyleTransferStrategy(),
  'fashion': new FashionStrategy(),
  'age_transform': new AgeTransformStrategy(),
  'hairstyle': new HairstyleStrategy(),
  'tattoo': new TattooStrategy(),
  'photography': new PhotographyStrategy(),
  'scene_gen': new SceneGenStrategy(),
  'hanfu': new HanfuStrategy(),
  'travel': new TravelStrategy(),
  // Map undefined modes to PortraitStrategy for now (replicating original behavior)
  'free_mode': new PortraitStrategy(),
  'pose_transfer': new PortraitStrategy(),
};

export const generatePortrait = async (
  referenceImageBase64: string,
  prompt: string,
  ratio: AspectRatio,
  mode: AppMode = 'portrait',
  targetImageBase64?: string,
  faceDescription?: string,
  model: string = 'gemini-2.5-flash-image',
  styleDirection?: 'photo_to_cartoon' | 'cartoon_to_photo',
  cartoonStyle?: string,
  ethnicity?: string,
  fashionParams?: any,
  ageParams?: any,
  hairstyleParams?: any,
  tattooParams?: any,
  photographyParams?: any,
  poseParams?: any,
  sceneGenParams?: any,
  freeModeParams?: any,
  hanfuParams?: any,
  travelParams?: any // Added travelParams support
): Promise<string> => {
  const ai = getClient();

  const strategy = strategies[mode] || strategies['portrait'];

  const context: GenerationContext = {
    referenceImageBase64,
    prompt,
    ratio,
    targetImageBase64,
    faceDescription,
    styleDirection,
    cartoonStyle,
    ethnicity,
    fashionParams,
    ageParams,
    hairstyleParams,
    tattooParams,
    photographyParams,
    poseParams,
    sceneGenParams,
    freeModeParams,
    hanfuParams,
    travelParams
  };

  try {
    const parts = await strategy.buildParts(context);

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const resultParts = response.candidates?.[0]?.content?.parts;
    if (!resultParts || resultParts.length === 0) {
      throw new Error("No image generated.");
    }

    // Handle the image response
    for (const part of resultParts) {
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
