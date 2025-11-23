import { GenerationContext, GenerationStrategy } from './types';

export class PhotographyStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, photographyParams } = context;
        const {
            generationMode,
            backgroundImage,
            subject,
            location,
            expression,
            action,
            background,
            atmosphere,
            weather,
            lighting,
            aperture,
            focalLength,
            iso,
            shutterSpeed,
            lensType
        } = photographyParams || {};

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Prepare background image part if it exists
        const bgImagePart = backgroundImage ? {
            inlineData: {
                data: cleanBase64(backgroundImage),
                mimeType: "image/jpeg"
            }
        } : null;

        let parts: any[] = [];

        if (generationMode === 'image-to-image') {
            // Image-to-Image Mode: Use character (main reference) and background references
            const photographyPrompt = `
        Task: Professional Photography - Image Composition
        
        Mode: Image-to-Image Composition
        
        Reference Images:
        - Character Reference (Image 1): Use this person's facial identity and body characteristics (Main Reference Image)
        - Background Reference (Image 2): Use this scene/environment as the setting (Second Image if provided)
        
        Camera Settings:
        - Aperture: ${aperture || 'f/2.8'} (controls depth of field)
        - Focal Length: ${focalLength || '50mm'} (controls perspective and field of view)
        - ISO: ${iso || '100'} (affects image grain and noise)
        - Shutter Speed: 1/${shutterSpeed || '250'}s (affects motion blur)
        - Lens Type: ${lensType || 'prime'} lens
        
        CRITICAL Requirements:
        1. FACIAL IDENTITY PRESERVATION (ABSOLUTE PRIORITY): The person's face from the Character Reference MUST be preserved EXACTLY - same facial features, expressions, skin tone, and identity.
        2. SCENE COMPOSITION: Place the person naturally within the background scene from the Background Reference image.
        3. PHOTOREALISTIC QUALITY: Generate a professional, high-quality photograph that looks like it was taken with the specified camera settings.
        4. DEPTH OF FIELD: Apply appropriate depth of field based on aperture (${aperture}):
           - f/1.4-f/2.8: Very shallow, blurred background
           - f/4-f/5.6: Moderate blur
           - f/8-f/16: Sharp background
        5. PERSPECTIVE: Use ${focalLength} focal length perspective:
           - 24-35mm: Wide angle, expansive view
           - 50mm: Natural human eye perspective
           - 85-200mm: Compressed, telephoto look
        6. LIGHTING: Natural, professional lighting that matches the scene
        7. NATURAL INTEGRATION: The person should look naturally placed in the scene, not composited
        8. TECHNICAL ACCURACY: Image should reflect the technical characteristics of the camera settings
        
        Generate a professional photograph that seamlessly combines the character with the background scene.
      `;

            if (refImagePart) parts.push(refImagePart);
            if (bgImagePart) parts.push(bgImagePart);
            parts.push({ text: photographyPrompt });

        } else {
            // Text-to-Image Mode (with optional Character Reference)
            const photographyPrompt = `
        Task: Professional Photography - Text-to-Image Generation
        
        Scene Description:
        - Subject: ${subject || 'A person'}
        - Location: ${location || 'Outdoor setting'}
        - Expression: ${expression || 'Natural'}
        - Action: ${action || 'Standing naturally'}
        - Background: ${background || 'Natural environment'}
        - Atmosphere: ${atmosphere || 'Peaceful'}
        - Weather: ${weather || 'Clear'}
        - Lighting: ${lighting || 'Natural daylight'}
        
        Camera Settings:
        - Aperture: ${aperture || 'f/2.8'} (controls depth of field)
        - Focal Length: ${focalLength || '50mm'} (controls perspective)
        - ISO: ${iso || '100'} (affects grain/noise)
        - Shutter Speed: 1/${shutterSpeed || '250'}s (affects motion)
        - Lens Type: ${lensType || 'prime'} lens
        
        Technical Requirements:
        1. PHOTOREALISTIC QUALITY: Generate a professional, high-quality photograph that looks like it was captured with real camera equipment.
        2. DEPTH OF FIELD: Apply appropriate depth of field based on ${aperture}:
           - f/1.4-f/2.8: Very shallow depth, beautifully blurred background (bokeh)
           - f/4-f/5.6: Moderate depth, some background blur
           - f/8-f/16: Deep depth, sharp throughout
        3. FOCAL LENGTH PERSPECTIVE: Use ${focalLength} perspective:
           - 24-35mm: Wide angle with slight distortion, expansive view
           - 50mm: Natural perspective matching human vision
           - 85-135mm: Portrait compression, flattering perspective
           - 200mm+: Strong compression, isolated subject
        4. ISO CHARACTERISTICS: Reflect ISO ${iso} grain:
           - 100-400: Clean, minimal grain
           - 800-1600: Slight visible grain
           - 3200+: Noticeable film-like grain
        5. LIGHTING QUALITY: Professional ${lighting} lighting with proper shadows, highlights, and color temperature
        6. COMPOSITION: Professional composition following rule of thirds, leading lines, and proper framing
        7. ATMOSPHERE: Capture the ${atmosphere} mood through lighting, color grading, and scene elements
        8. WEATHER EFFECTS: Include ${weather} weather conditions with appropriate atmospheric effects
        
        Generate a professional photograph that looks like it was taken by an experienced photographer with high-end equipment.
      `;

            parts = [refImagePart, { text: photographyPrompt }];
        }

        return parts.filter(part => part !== null);
    }
}
