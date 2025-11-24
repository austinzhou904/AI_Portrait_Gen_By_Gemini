import { GenerationContext, GenerationStrategy } from './types';
import { PET_MERCH_PRESETS } from '../../constants/petMerchOptions';

export class PetMerchStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, ratio, petMerchParams } = context;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Get the selected preset
        const selectedPreset = PET_MERCH_PRESETS.find(
            preset => preset.id === petMerchParams?.selectedPreset
        );

        // Use custom prompt if provided, otherwise use preset prompt
        const basePrompt = petMerchParams?.customPrompt || selectedPreset?.prompt || PET_MERCH_PRESETS[0].prompt;

        // Add aspect ratio and resolution requirements
        const fullPrompt = `${basePrompt}

输出要求：
- 宽高比：${ratio}
- 风格：${selectedPreset?.name || 'Pet Merch'}
- 保持主体特征：确保生成的图像中能认出原图的主体（人物或宠物）
- 质量：高分辨率，细节清晰`;

        return [refImagePart, { text: fullPrompt }].filter(part => part !== null);
    }
}
