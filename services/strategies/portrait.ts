import { GenerationContext, GenerationStrategy } from './types';

export class PortraitStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, prompt, ratio } = context;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        const portraitPrompt = `
      Task: Generate a high-quality, photorealistic portrait based on the attached reference image.
      
      Constraints:
      1. IDENTITY CONSISTENCY: You MUST preserve the facial features, identity, and likeness of the person in the reference image. The generated face must look exactly like the person provided.
      2. ASPECT RATIO: The output image MUST have an aspect ratio of ${ratio}.
      3. RESOLUTION: High resolution, extremely detailed, long edge approx 2048px quality.
      
      Style & Scene Description:
      ${prompt}
      
      Ensure the lighting and composition matches the requested style while keeping the subject's identity intact.
    `;

        return [refImagePart, { text: portraitPrompt }].filter(part => part !== null);
    }
}
