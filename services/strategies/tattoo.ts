import { GenerationContext, GenerationStrategy } from './types';

export class TattooStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, tattooParams } = context;
        const { position, design, customDesign } = tattooParams || {};

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Determine the tattoo description
        let tattooDescription = '';
        if (design === 'custom' && customDesign) {
            tattooDescription = customDesign;
        } else {
            tattooDescription = design ? design.replace(/_/g, ' ') + ' tattoo' : 'decorative tattoo';
        }

        const positionDescription = position ? position.replace(/_/g, ' ') : 'upper arm';

        const tattooPrompt = `
      Task: Tattoo Preview - Generate a full-body photo with a tattoo at a specific location.
      
      Reference Image: The attached image shows the person's face and identity.
      
      Tattoo Specifications:
      - Location: ${positionDescription}
      - Design: ${tattooDescription}
      
      CRITICAL Constraints:
      1. FACE PRESERVATION (ABSOLUTE PRIORITY): The facial features, face shape, eyes, nose, mouth, skin tone, and overall facial identity MUST remain EXACTLY the same as the reference image. DO NOT alter the face in ANY way.
      2. FULL-BODY COMPOSITION: Generate a full-body, front-facing photo showing the person from head to toe.
      3. APPROPRIATE ATTIRE: The person should be wearing appropriate swimwear:
         - For males: swim trunks/board shorts
         - For females: one-piece swimsuit or athletic two-piece swimsuit
         This allows clear visibility of the tattoo while maintaining modesty and appropriateness.
      4. BODY SHAPE PRESERVATION: Keep the person's body shape, build, and proportions consistent with what would be expected from their face and reference image.
      5. TATTOO PLACEMENT: Place the ${tattooDescription} precisely on the ${positionDescription}. The tattoo should be clearly visible and appropriately sized for the body location.
      6. REALISTIC TATTOO: The tattoo must look like real ink on skin - with proper shading, depth, and integration with skin texture. It should appear as if it's actually tattooed on the person.
      7. NATURAL POSE: Use a natural standing pose that clearly shows the tattoo location. The person should be facing forward or slightly angled to display the tattoo.
      8. QUALITY: High-quality, photorealistic image with professional lighting.
      9. BACKGROUND: Use a neutral, clean background (studio setting or simple outdoor setting) that doesn't distract from the tattoo.
      
      Remember: This is a tattoo preview to help visualize how the tattoo would look. The person's face and body shape must be perfectly preserved from the reference image.
    `;

        return [refImagePart, { text: tattooPrompt }].filter(part => part !== null);
    }
}
