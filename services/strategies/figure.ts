import { GenerationContext, GenerationStrategy } from './types';
import { DEFAULT_FIGURE_PROMPT } from '../../constants/figureOptions';

export class FigureStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, ratio, figureParams } = context;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Use user provided prompt or default
        const promptText = figureParams?.prompt || DEFAULT_FIGURE_PROMPT;

        // Add aspect ratio requirement
        const fullPrompt = `${promptText}

Output Requirements:
- Aspect Ratio: ${ratio}
- Quality: High resolution, 8k, highly detailed`;

        return [refImagePart, { text: fullPrompt }].filter(part => part !== null);
    }
}
