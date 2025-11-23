import { GenerationContext, GenerationStrategy } from './types';

export class HanfuStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, hanfuParams, ratio } = context;

        if (!hanfuParams) {
            throw new Error("Hanfu parameters are required");
        }

        // Import hanfu options dynamically
        const { DYNASTIES, MAKEUP_STYLES, ACCESSORIES, BACKGROUND_STYLES } = await import('../../constants/hanfuOptions');

        const { selectedDynasty, selectedMakeup, selectedAccessory, selectedBackground } = hanfuParams;

        // Get selected options
        const dynasty = DYNASTIES.find(d => d.id === selectedDynasty);
        const makeup = MAKEUP_STYLES.find(m => m.id === selectedMakeup);
        const accessory = ACCESSORIES.find(a => a.id === selectedAccessory);
        // Default to 'garden' if no background selected (backward compatibility)
        const background = BACKGROUND_STYLES.find(b => b.id === selectedBackground) || BACKGROUND_STYLES.find(b => b.id === 'garden');

        if (!dynasty || !makeup || !accessory || !background) {
            throw new Error("Invalid Hanfu selection");
        }

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Build JSON prompt configuration
        const hanfuJSON = {
            dynasty: {
                period: dynasty.period,
                name: dynasty.name,
                style: dynasty.imagePrompt
            },
            makeup: {
                style: makeup.name,
                details: makeup.promptDetail
            },
            accessories: {
                type: accessory.name,
                details: accessory.promptDetail
            },
            background: {
                style: background.name,
                details: background.promptDetail
            }
        };

        const hanfuPrompt = `
      Task: Generate Traditional Chinese Hanfu Portrait with JSON Configuration.
      
      Input: Reference Image (User's Face - Identity Source).
      
      JSON Hanfu Configuration:
      ${JSON.stringify(hanfuJSON, null, 2)}
      
      CRITICAL INSTRUCTIONS:
      1. **IDENTITY PRESERVATION (ABSOLUTE PRIORITY)**: Strictly maintain the facial features and identity of the person in the Reference Image. The face MUST remain exactly the same.
      2. **Hanfu Clothing**: Generate authentic ${dynasty.period} traditional Chinese Hanfu: ${dynasty.imagePrompt}
      3. **Makeup**: Apply ${makeup.name} (${makeup.promptDetail}) while preserving facial features.
      4. **Hair & Accessories**: Traditional Chinese ${dynasty.period} hairstyle with ${accessory.name}: ${accessory.promptDetail}
      5. **Background Style**: ${background.promptDetail}. ${background.id === 'gongbi' || background.id === 'shuimo' ? 'Render the background in traditional Chinese painting style, but keep the face photorealistic and naturally blended.' : 'Photorealistic background.'}
      6. **Photorealism**: Subject must look like a real person (unless specific artistic background blends are requested, face remains real).
      7. **Cultural Authenticity**: Historically accurate ${dynasty.period} Hanfu styling.
      8. **Pose**: Graceful pose suitable for traditional Chinese portraiture.
      9. **Aspect Ratio**: Output MUST be ${ratio}.
      10. **Quality**: Ultra-high resolution, professional quality.
      
      Generate a stunning traditional Chinese Hanfu portrait that perfectly preserves facial identity.
    `;

        return [refImagePart, { text: hanfuPrompt }].filter(part => part !== null);
    }
}
