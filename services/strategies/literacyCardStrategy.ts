import { GenerationContext, GenerationStrategy } from './types';

export class LiteracyCardStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { literacyCardParams, ratio } = context;

        if (!literacyCardParams) {
            throw new Error("Literacy Card parameters are required");
        }

        const { theme } = literacyCardParams;
        const themeText = theme || "Animal World";

        const prompt = `
A vertical A4 educational poster design for toddlers (2-5 years), featuring a high-angle, wide-angle miniature diorama view of ${themeText}.

**1. Visual Style & Atmosphere:**
- **Aesthetic:** Soft Claymation / Plush 3D Sculpture style. Everything looks like a tactile, high-quality toy set. Rounded edges, no sharp corners.
- **Lighting:** Bright, warm, pure volumetric lighting, creating a healing and safe atmosphere.
- **Colors:** Morandi and Macaron pastel color palette.
- **Render:** 8k resolution, Cinema 4D style, ultra-detailed textures (matte clay, soft rubber).

**2. Layout & Composition:**
- **Top Header:** A large, colorful, bubbly clay balloon font title reading "${themeText.toUpperCase()}". Decorated with small relief icons like paw prints and leaves.
- **Main Scene:** A crowded but organized "Toy Micro-World". Foreground and midground are sharp.
- **Guide Characters:** A cute round clay explorer baby and a tiny clay bird, pointing enthusiastically at the items.

**3. The Content (Distributed Scatter Style):**
- **Major Objects:** Various cute, rounded items related to ${themeText}, styled as soft clay loops or chunky toys.
- **Minor Details:** Small decorative elements, plants, or props fitting the theme.
- **Environment:** Round river stones, a blue jelly-like river, cotton-candy clouds, soft green mossy ground.

**4. The Labeling System (Crucial UI):**
- **The Labels:** Floating rounded-rectangular cards with a thick clay texture (creamy white background). Each card displays a mock-up of 3 lines of text (Chinese / Pinyin / English).
- **The Arrows:** Thick, rounded 3D arrows (bright orange) looking like squeezed toothpaste.
- **Connection:** Arrows connect the label cards PRECISELY to the items, without crossing each other. The layout is clean and educational.

**Technical Specs:**
Aspect Ratio: ${ratio}.
    `;

        return [{ text: prompt }];
    }
}
