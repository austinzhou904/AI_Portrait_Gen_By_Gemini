import { GenerationContext, GenerationStrategy } from './types';
import { OOTD_STYLES, OOTD_DOLL_OPTIONS, OOTD_SCENE_OPTIONS, OOTD_TIME_OPTIONS } from '../../constants/ootdOptions';

export class OOTDStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, ootdParams, ratio } = context;

        if (!ootdParams) {
            throw new Error("OOTD parameters are required");
        }

        const { selectedStyle, clothing, location, doll, timeOfDay } = ootdParams;
        const style = OOTD_STYLES.find(s => s.id === selectedStyle) || OOTD_STYLES[0];
        const { variables } = style;

        const selectedDoll = OOTD_DOLL_OPTIONS.find(d => d.id === doll);
        const selectedScene = OOTD_SCENE_OPTIONS.find(s => s.id === location);
        const selectedTime = OOTD_TIME_OPTIONS.find(t => t.id === timeOfDay);

        // Resolve prompts
        const dollPrompt = selectedDoll && selectedDoll.id !== 'none' ? `, accompanied by ${selectedDoll.prompt}` : '';
        const scenePrompt = selectedScene && selectedScene.id !== 'default' ? selectedScene.prompt : (location || variables.backgroundDescription);
        const timePrompt = selectedTime && selectedTime.id !== 'default' ? selectedTime.prompt : '';

        // Construct Subject Description
        let subjectDesc = `A stylish young woman (20s)`;
        if (referenceImageBase64) {
            subjectDesc += ` (matching the reference face)`;
        } else {
            subjectDesc += `, beautiful Asian face`;
        }

        // Special handling for Monster Twin to match specific user request
        // if (selectedStyle === 'monster_twin' && (!doll || doll === 'none' || doll === 'zimomo')) {
        //     subjectDesc += ` standing side-by-side with a massive, furry, half-human-height 'Zimomo' style monster character. They are posing as equal partners.`;
        // } else {
        //     subjectDesc += dollPrompt;
        // }

        if (selectedDoll) {
            subjectDesc += `standing side-by-side with a massive, half-human-height ${selectedDoll.id} style character. They are dressing as equal partners.`;
        }

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        const prompt = `
A professional fashion magazine editorial layout design, high-quality commercial aesthetic.

**1. The Composition (Split Layout):**
The image is divided into two distinct sections:
- **The Left Side (70%):** A photorealistic lifestyle portrait.
- **The Right Side (30%):** A clean white sidebar containing graphic design elements, text, and data visualization.

**2. The Photography (Left Side):**
- **Subject:** ${subjectDesc}
- **Outfit:** ${clothing || variables.outfitDescription}.
- **Vibe:** ${variables.vibe}. ${timePrompt}.
- **Environment:** ${scenePrompt}.

**3. The Graphic Design (Right Side Sidebar):**
- **Title:** Large, elegant serif typography at the bottom reading "${variables.sidebarTitle}".
- **Section 1 (Top):** A text block labeled "**MOOD & OCCASION**" with pill-shaped tags reading "${variables.tags.join('", "')}".
- **Section 2 (Middle):** A section labeled "**SMART COLOR ANALYSIS**" showing a row of 5 circular color swatches (Palette: ${variables.colors.join(', ')}).
- **Section 3 (Bottom):** A section labeled "**OOTD STYLE**" featuring small, isolated "flat lay" product photos of the items she is wearing: ${variables.items.join(', ')}.

**4. Technical Specs:**
8k resolution, sharp typography rendering, clean graphic alignment, highly detailed fashion photography highlighting fur and fabric textures. Aspect Ratio: ${ratio}.
    `;

        return [refImagePart, { text: prompt }].filter(part => part !== null);
    }
}
