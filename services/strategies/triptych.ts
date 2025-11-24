import { GenerationContext, GenerationStrategy } from './types';
import { TRIPTYCH_PRESETS } from '../../constants/triptychOptions';

export class TriptychStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, ratio, triptychParams } = context;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Get the selected preset
        const selectedPreset = TRIPTYCH_PRESETS.find(
            preset => preset.id === triptychParams?.selectedPreset
        );

        // Use custom prompt if provided, otherwise use preset prompt
        const basePrompt = triptychParams?.customPrompt || selectedPreset?.prompt || TRIPTYCH_PRESETS[0].prompt;

        // Add aspect ratio and resolution requirements
        const fullPrompt = `${basePrompt}

出力要件：
- アスペクト比：${ratio}
- 解像度：長辺2048px（2K画質）
- フォーマット：水平3分割のトリプティック構成`;

        return [refImagePart, { text: fullPrompt }].filter(part => part !== null);
    }
}
