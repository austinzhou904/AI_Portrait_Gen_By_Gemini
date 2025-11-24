import { GenerationContext, GenerationStrategy } from './types';
import { PRODUCT_FOOD_PRESETS } from '../../constants/productFoodOptions';

export class ProductFoodStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, ratio, productFoodParams } = context;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Get the selected preset
        const selectedPreset = PRODUCT_FOOD_PRESETS.find(
            preset => preset.id === productFoodParams?.selectedPreset
        );

        // Use custom prompt if provided, otherwise use preset prompt
        const basePrompt = productFoodParams?.customPrompt || selectedPreset?.prompt || PRODUCT_FOOD_PRESETS[0].prompt;

        // Add aspect ratio and resolution requirements
        const fullPrompt = `${basePrompt}

输出要求：
- 宽高比：${ratio}
- 风格：商业摄影 / 美食摄影
- 光影：专业布光，强调质感
- 质量：高分辨率，细节清晰，无噪点`;

        return [refImagePart, { text: fullPrompt }].filter(part => part !== null);
    }
}
