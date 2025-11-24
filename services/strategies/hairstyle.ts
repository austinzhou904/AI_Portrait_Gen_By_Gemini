import { GenerationContext, GenerationStrategy } from './types';

export class HairstyleStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, hairstyleParams } = context;
        const { hairstyle } = hairstyleParams || {};

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;
        const hairstylePrompt = `
      Task: Hairstyle Modification - Change only the hairstyle while preserving everything else.
      
      Reference Image: The attached image shows the person whose hairstyle needs to be changed.
      
      ${hairstyle === 'nine_grid_recommendation' ? `
      根据我提供的图片，提供9种不同的韩流发型设计，输出在一张照片，特写不同的发型进行展示
      ` : `
      Target Hairstyle: ${hairstyle ? hairstyle.replace(/_/g, ' ') : 'Modern styled hair'}
      
      CRITICAL Constraints:
      1. FACE PRESERVATION (ABSOLUTE PRIORITY): The facial features, face shape, eyes, nose, mouth, skin tone, and overall facial identity MUST remain EXACTLY the same as the reference image. DO NOT alter the face in ANY way.
      2. HAIRSTYLE ONLY: ONLY change the hairstyle to match the requested style. The hair color should complement the person's natural appearance.
      3. EVERYTHING ELSE UNCHANGED: Keep the clothing, accessories, background, pose, expression, and all other elements EXACTLY as they appear in the reference image.
      4. NATURAL INTEGRATION: The new hairstyle must look natural and realistic, properly integrated with the person's face and head shape.
      5. QUALITY: Generate a high-quality, photorealistic image with detailed hair texture.
      6. ASPECT RATIO: Maintain the same aspect ratio as the reference image.
      7. SEAMLESS BLEND: Ensure the hairline and hair edges blend naturally with the forehead and face.
      `}
      
      Remember: This is ONLY a hairstyle change. The person's face and identity must be perfectly preserved.
    `;

        return [refImagePart, { text: hairstylePrompt }].filter(part => part !== null);
    }
}
