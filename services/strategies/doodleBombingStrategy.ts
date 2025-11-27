import { GenerationContext, GenerationStrategy } from './types';

export class DoodleBombingStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, doodleBombingParams, ratio } = context;

        if (!doodleBombingParams) {
            throw new Error("Doodle Bombing parameters are required");
        }

        const { doodleStyle, background, expression, bodyPose, timeOfDay } = doodleBombingParams;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Background Logic
        let backgroundPrompt = 'A blurred, colorful urban graffiti alleyway in bright daylight';
        switch (background) {
            case 'neon_city': backgroundPrompt = 'A vibrant cyberpunk city street at night with neon signs'; break;
            case 'white_studio': backgroundPrompt = 'A clean, high-key white studio background'; break;
            case 'abstract_pop': backgroundPrompt = 'A dynamic abstract background with pop-art patterns and halftone dots'; break;
            case 'skate_park': backgroundPrompt = 'A sunny outdoor skate park with concrete ramps and blue sky'; break;
            case 'graffiti_alley': default: backgroundPrompt = 'A blurred, colorful urban graffiti alleyway in bright daylight'; break;
        }

        // Sticker Style Logic
        let stickerPrompt = 'Sentient heart characters with smiling faces, floating blob monsters with winking eyes, and cute cartoon animals (like winged puppies).';
        let stickerStyleDesc = 'Thick black outlines, flat saturated colors (Hot Pink, Cyan, Electric Yellow, Lime Green)';

        switch (doodleStyle) {
            case 'retro_pop':
                stickerPrompt = 'Classic pop art elements, comic book dots, speech bubbles with "POW!" and "BANG!", bold geometric shapes.';
                stickerStyleDesc = 'Halftone patterns, primary colors (Red, Blue, Yellow), comic book aesthetic.';
                break;
            case 'neon_cyber':
                stickerPrompt = 'Glowing neon circuit lines, digital glitches, futuristic HUD elements, holographic emojis.';
                stickerStyleDesc = 'Glowing neon outlines, cyberpunk color palette (Cyan, Magenta, Electric Blue), digital aesthetic.';
                break;
            case 'street_graffiti':
                stickerPrompt = 'Wildstyle graffiti tags, spray paint drips, crown icons, arrows, and urban street art motifs.';
                stickerStyleDesc = 'Spray paint texture, drips, bold street art colors, urban aesthetic.';
                break;
            case 'floral_dream':
                stickerPrompt = 'Floating 2D vector flowers, vines, butterflies, and organic swirling patterns.';
                stickerStyleDesc = 'Pastel colors, elegant vector lines, soft and dreamy aesthetic.';
                break;
            case 'cute_monsters':
            default:
                stickerPrompt = 'Sentient heart characters with smiling faces, floating blob monsters with winking eyes, and cute cartoon animals.';
                stickerStyleDesc = 'Thick black outlines, flat saturated colors (Hot Pink, Cyan, Electric Yellow, Lime Green).';
                break;
        }

        const doodlePrompt = `Task: Generate a "Doodle Bombing" Mixed Media Portrait

      ${referenceImageBase64 ? 'REFERENCE FACE PROVIDED: Use the attached image to preserve facial identity exactly.' : 'NO REFERENCE IMAGE: Generate character from description.'}

      [Aesthetic Philosophy]: "Harajuku Pop-Art Explosion". A creative blend of hyper-realistic commercial photography and vibrant 2D cartoon/vector art.

      [1. The Subject & Action]:
      - Appearance: A photorealistic medium shot of a cute young Asian woman (20s) (or matching reference face).
      - Expression: ${expression.replace('_', ' ')}
      - Pose: ${bodyPose.replace('_', ' ')}
      - Outfit: Rainbow-striped t-shirt and pink denim overalls (dungarees).
      - The Effect: Her gesture acts as the epicenter, seemingly manifesting her energy into physical doodle art that bursts outward.

      [2. The Illustration Layer (Doodle Bombing)]:
      - The realistic subject is surrounded by a dense, energetic cloud of 2D vector-style graphics.
      - Creatures/Elements: ${stickerPrompt}
      - Graphics: Sparkling stars, rainbow arcs, lightning bolts, and bubbly graffiti text bubbles.
      - Style: ${stickerStyleDesc} to contrast sharply with the realistic photo.
      - Integration: The doodles should interact with the subject (e.g., peeking over her shoulder, floating near her hands).

      [3. Environment & Lighting]:
      - Setting: ${backgroundPrompt}. The background is out of focus to keep attention on the mixed-media foreground.
      - Lighting: Cinematic high-key lighting. Soft, flattering light on the girl's face, contrasting with the neon brightness of the flat vector graphics.
      - Time of Day: ${timeOfDay.replace('_', ' ')}

      [4. Technical Specs]:
      - 8k resolution, Phase One IQ4 quality, sharp focus on the subject.
      - Aesthetic: "Harajuku Pop-Art" meets "Urban Street Style".
      - High-fidelity texture on the skin and fabric vs. sharp vector lines.
      - Aspect Ratio: ${ratio}
      `;

        return [refImagePart, { text: doodlePrompt }].filter(part => part !== null);
    }
}
