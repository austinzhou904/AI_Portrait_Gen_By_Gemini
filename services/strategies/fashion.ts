import { GenerationContext, GenerationStrategy } from './types';

export class FashionStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, fashionParams } = context;
        const { glasses, hairstyle, hat, clothing, shoes } = fashionParams || {};

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        const fashionPrompt = `
      Task: Fashion Studio - Generate a photorealistic portrait with specific styling.
      
      Reference Image: The attached image provides the FACE/IDENTITY of the person.
      
      Styling Requirements:
      - Clothing: ${clothing ? clothing.replace(/_/g, ' ') : 'Stylish outfit'}
      - Hairstyle: ${hairstyle ? hairstyle.replace(/_/g, ' ') : 'Styled hair'}
      - Hat: ${hat && hat !== 'none' ? hat.replace(/_/g, ' ') : 'No hat'}
      - Glasses: ${glasses && glasses !== 'none' ? glasses.replace(/_/g, ' ') : 'No glasses'}
      - Shoes: ${shoes ? shoes.replace(/_/g, ' ') : 'Matching shoes'}
      
      Constraints:
      1. IDENTITY (CRITICAL): The face of the person in the generated image MUST MATCH the reference image exactly. Do not change the face.
      2. OUTFIT: The person must be wearing the requested items.
      3. COMPOSITION: Full body or 3/4 body shot to show the outfit.
      4. STYLE: High fashion photography, professional lighting, studio or suitable outdoor background.
      5. QUALITY: 8k resolution, highly detailed textures.
      6. MODIFICATION: Only modify the clothing, hair, and accessories. Keep the facial features 100% unchanged.
    `;

        return [refImagePart, { text: fashionPrompt }].filter(part => part !== null);
    }
}
