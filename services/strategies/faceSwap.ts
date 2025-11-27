import { GenerationContext, GenerationStrategy } from './types';

export class FaceSwapStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { targetImageBase64, referenceImageBase64, faceDescription } = context;

        if (!targetImageBase64) {
            throw new Error("Target image is required for Face Swap mode.");
        }

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const targetImagePart = {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(targetImageBase64),
            },
        };

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Order matters for "Edit" tasks:
        // 1. The Image to be modified (Target Scene)
        // 2. The Reference Image (Source of Face)
        const parts: any[] = [targetImagePart, refImagePart];

        const targetFaceDesc = faceDescription ? faceDescription : "the main person";

        // A direct, command-style prompt works best for editing
        const faceSwapPrompt = `
      Operation: Face Swap & Enhancement.
      
      The first image is the TARGET SCENE.
      The second image is the SOURCE IDENTITY.
      
      Instruction:
      High-fidelity face swap, seamless composite. Replace the face of ${targetFaceDesc} and hair with the face and hair of the person in the second image (Source Identity) while strictly preserving original head pose, rotation, and eye gaze direction. Match skin tone, grain, and texture to the target image. Harmonize lighting, shadows, and white balance for a fully integrated photorealistic result. 8k resolution, sharp focus.
      
      Strict Rules:
      1. CRITICAL: The facial identity MUST match the SOURCE IDENTITY exactly.
      2. ASPECT RATIO: The output image MUST have the EXACT SAME aspect ratio as the TARGET SCENE (first image). Do not crop or resize the canvas.
      3. RESOLUTION: Generate a high-resolution image with the long edge approximately 2048px.
      4. Keep the first image's composition, pose, and clothing EXACTLY as they are (except for the face and hair swap).
      5. Seamlessly blend the new face with the target environment's lighting and skin tone.
      6. Output must be high-definition, photorealistic, and free of noise or artifacts.
    `;

        console.log('Generated Face Swap Prompt:', faceSwapPrompt);

        parts.push({ text: faceSwapPrompt });
        return parts;
    }
}
