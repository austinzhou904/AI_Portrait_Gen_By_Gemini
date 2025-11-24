import { GenerationContext, GenerationStrategy } from './types';
import { BEAUTY_OPTIONS } from '../../constants/beautyOptions';

export class BeautyStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, beautyParams } = context;
        const { selectedOptions } = beautyParams || { selectedOptions: [] };

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Collect selected prompts
        const selectedPrompts = selectedOptions.map(id => {
            const option = BEAUTY_OPTIONS.find(opt => opt.id === id);
            return option ? option.prompt : '';
        }).filter(p => p !== '');

        // Remove duplicates if any (though IDs should be unique)
        const uniquePrompts = [...new Set(selectedPrompts)];

        const beautyPrompt = `
      Task: Portrait Beauty Retouching - Natural & Realistic

      Reference Image: The attached image shows the person to be retouched.

      Base Style: Nano Banana style, Street Snap x Natural Light.

      Retouching Instructions:
      ${uniquePrompts.map((p, index) => `${index + 1}. ${p}`).join('\n')}

      CRITICAL Constraints:
      1. IDENTITY PRESERVATION: The person's facial features and identity MUST remain EXACTLY the same.
      2. NATURAL LOOK: Avoid over-processing. The result should look like a high-end camera shot with natural lighting.
      3. TEXTURE: Maintain skin texture where appropriate (as per instructions).
      4. LIGHTING: Keep the original lighting atmosphere unless specified otherwise.
      5. OUTPUT: High-quality, photorealistic portrait.
    `;

        return [refImagePart, { text: beautyPrompt }].filter(part => part !== null);
    }
}
