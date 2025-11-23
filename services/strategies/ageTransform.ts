import { GenerationContext, GenerationStrategy } from './types';

export class AgeTransformStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, ageParams } = context;
        const age = ageParams?.targetAge || 30;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        const agePrompt = `
      Task: Age Transformation - Re-imagine the person at age ${age}.
      
      Instruction:
      Generate a photorealistic portrait of the person in the reference image as if they were ${age} years old.
      
      Strict Rules:
      1. IDENTITY (CRITICAL): The facial features (eyes, nose, mouth shape, bone structure) MUST remain recognizable as the SAME PERSON.
      2. AGE MARKERS: Adjust skin texture, wrinkles, hair color/thickness, and facial maturity to match the age of ${age}.
      3. EXPRESSION & POSE: Keep the same expression and pose as the reference image.
      4. CLOTHING: Keep the clothing style consistent or age-appropriate if necessary, but prefer preserving original style.
      5. OUTPUT: High-quality, realistic photography.
    `;

        return [refImagePart, { text: agePrompt }].filter(part => part !== null);
    }
}
