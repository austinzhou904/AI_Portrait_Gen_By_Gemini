import { GenerationContext, GenerationStrategy } from './types';

export class SceneGenStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, sceneGenParams, ratio } = context;

        if (!sceneGenParams) {
            throw new Error("Scene generation parameters are required");
        }

        const {
            characterAge, characterType, ethnicity, eyeSize, skinTone, expression, gazeDirection,
            bodyPose, bodyOrientation, headDirection, action,
            topType, topColor, topStyle, bottomType, bottomStyle, shoesType, shoesColor,
            locationType, surface, props, customProps,
            cameraAngle, shotType, photoStyle, quality,
            lightingType, timeOfDay, weather, atmosphere
        } = sceneGenParams;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Build clothing description
        const topDesc = `${topColor.replace('_', ' ')} ${topType.replace('_', ' ')} with ${topStyle.replace('_', ' ')} style`;
        const bottomDesc = `${bottomStyle.replace('_', ' ')} ${bottomType.replace('_', ' ')}`;
        const shoesDesc = `${shoesColor.replace('_', ' ')} ${shoesType.replace('_', ' ')}`;

        // Build props list
        let propsDesc = '';
        if (props && props.length > 0) {
            const propsList = props.map((p: string) => p.replace('_', ' ')).join(', ');
            propsDesc = `Scene props: ${propsList}`;
            if (customProps) {
                propsDesc += `, ${customProps}`;
            }
        } else if (customProps) {
            propsDesc = `Scene props: ${customProps}`;
        }

        const sceneGenPrompt = `
      Task: Generate an Ultra-Realistic Influencer Scene Photo with Professional Beauty Enhancement
      
      ${referenceImageBase64 ? 'REFERENCE FACE PROVIDED: Use the attached image to preserve facial identity exactly.' : 'NO REFERENCE IMAGE: Generate character from description below.'}
      
      CHARACTER SPECIFICATIONS:
      - Age: ${characterAge} years old
      - Type: ${characterType.replace('_', ' ')}
      - Ethnicity: ${ethnicity.replace('_', ' ')} with authentic ethnic features
      - Eye Size: ${eyeSize.replace('_', ' ')} eyes
      - Skin Tone: ${skinTone.replace('_', ' ')} complexion
      - Expression: ${expression.replace('_', ' ')}
      - Gaze: Looking ${gazeDirection.replace('_', ' ')}
      
      POSE & ACTION:
      - Body Pose: ${bodyPose.replace('_', ' ')}
      - Body Orientation: ${bodyOrientation.replace('_', ' ')}
      - Head Direction: ${headDirection.replace('_', ' ')}
      - Action: ${action.replace('_', ' ')}
      
      OUTFIT:
      - Top: ${topDesc}
      - Bottom: ${bottomDesc}
      - Shoes: ${shoesDesc}
      
      SCENE & ENVIRONMENT:
      - Location: ${locationType.replace('_', ' ')}
      - Surface/Ground: ${surface.replace('_', ' ')}
      ${propsDesc}
      - Lighting: ${lightingType.replace('_', ' ')} lighting
      - Time of Day: ${timeOfDay.replace('_', ' ')}
      - Weather: ${weather.replace('_', ' ')}
      - Atmosphere: ${atmosphere.replace('_', ' ')} mood
      
      CAMERA & STYLE:
      - Camera Angle: ${cameraAngle.replace('_', ' ')}
      - Shot Type: ${shotType.replace('_', ' ')}
      - Photo Style: ${photoStyle.replace('_', ' ')}
      - Quality: ${quality} ultra-high resolution
      
      CRITICAL REQUIREMENTS:
      ${referenceImageBase64 ?
                `1. FACIAL IDENTITY (ABSOLUTE PRIORITY): The person's face MUST match the reference image's identity and bone structure. Keep the same facial features and recognizable identity while applying beauty enhancements.` :
                `1. FACIAL GENERATION: Generate a realistic ${characterAge}-year-old ${characterType.replace('_', ' ')} with ${ethnicity.replace('_', ' ')} ethnicity.`
            }
      2. PROFESSIONAL BEAUTY ENHANCEMENT (CRITICAL FOR INFLUENCER QUALITY):
         - Apply subtle, natural beauty retouching that preserves facial identity
         - Smooth skin texture while maintaining natural pores and realistic detail
         - Enhance eyes to be brighter, clearer, and more expressive
         - Optimize facial features to be more photogenic (slightly enhanced cheekbones, defined jawline)
         - Use flattering, soft lighting that minimizes imperfections
         - Apply professional color grading with warm, flattering tones
         - Subtle enhancement to make the person look their absolute best while staying natural
         - Think: "Best professional photo vs casual snapshot" - polished but believable
      3. ULTRA-REALISM: This must look like a real photograph taken with professional equipment. NO illustration, NO 3D rendering, NO artistic interpretation.
      4. INSTAGRAM/INFLUENCER QUALITY: Professional influencer photo quality with perfect lighting, composition, and color grading similar to high-end Instagram/TikTok influencer content.
      5. NATURAL AUTHENTICITY: The enhancements should be subtle enough that the photo still looks real and natural, not overly filtered or fake.
      6. PRECISE SCENE: Follow ALL scene parameters exactly - location, surface, props, lighting, weather.
      7. PROPER OUTFIT: The clothing must match the specifications precisely - colors, types, and styles.
      8. CINEMATIC QUALITY: Professional color grading, proper depth of field, natural bokeh where appropriate, flattering soft focus on background.
      9. FLATTERING LIGHTING: Use lighting that naturally slims and flatters facial features - soft diffused light, slight rim lighting, avoid harsh shadows on face.
      10. ACCURATE PHYSICS: Realistic fabric draping, proper shadows, correct perspective, natural lighting physics.
      11. ASPECT RATIO: Output must be ${ratio} aspect ratio.
      12. DETAIL LEVEL: 8K quality with extreme detail, beautiful skin texture (smooth but real), crisp eyes, sharp focus on face.
      
      BEAUTY RETOUCHING GUIDELINES:
      - Skin: Even tone, subtle glow, minimized blemishes, natural smoothness (NOT plastic or airbrushed)
      - Eyes: Bright, clear whites, enhanced iris detail, natural sparkle, slightly enlarged if flattering
      - Face: Subtle contouring through lighting, enhanced bone structure, natural symmetry optimization
      - Overall: Should look like a professionally shot and edited influencer photo - polished, flattering, but still believable and natural
      
      STYLE NOTES:
      - This is for social media/influencer content
      - Should look like a high-end lifestyle photo with professional editing
      - Natural yet flawless aesthetic (like top Instagram influencers)
      - Professional yet authentic and relatable
      - Perfect for Instagram/TikTok/social platforms
      - The kind of photo that gets thousands of likes
      
      Generate a stunning, ultra-realistic photograph that looks like a professionally shot and retouched influencer photo - the person should look their absolute best while maintaining natural believability and facial identity.
    `;

        return [refImagePart, { text: sceneGenPrompt }].filter(part => part !== null);
    }
}
