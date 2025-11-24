import { GenerationContext, GenerationStrategy } from './types';
import { COUNTRIES, SEASONS, FESTIVALS, TIMES_OF_DAY, CAMERA_POSITIONS, LENS_TYPES, PITCH_ANGLES, SHOT_TYPES } from '../../constants/travelOptions';

export class TravelStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, ratio, travelParams } = context;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Check if we are in planning mode (inferred from lack of specific photo params or explicit flag if we added one)
        // For now, we can check if 'landmark' contains a long description which suggests planning preference
        const isPlanningMode = travelParams?.landmark && travelParams.landmark.length > 20 && !travelParams.season;

        if (isPlanningMode) {
            const planningPrompt = `请为我规划去 ${travelParams.country} 的旅行行程。
偏好：${travelParams.landmark}

请提供：
1. 每日行程安排（Morning, Afternoon, Evening）
2. 必去景点推荐
3. 当地美食推荐
4. 拍照打卡点建议

请以清晰的Markdown格式输出。`;

            // For planning, we might not need the reference image, but we'll include it if provided as context
            return [refImagePart, { text: planningPrompt }].filter(part => part !== null);
        }

        // Normal Photo Generation Mode
        const countryName = COUNTRIES.find(c => c.id === travelParams?.country)?.name || travelParams?.country;
        const seasonName = SEASONS.find(s => s.id === travelParams?.season)?.name || '';
        const festivalName = FESTIVALS.find(f => f.id === travelParams?.festival)?.name || '';
        const timeName = TIMES_OF_DAY.find(t => t.id === travelParams?.timeOfDay)?.name || '';
        const cameraPosName = CAMERA_POSITIONS.find(c => c.id === travelParams?.cameraPosition)?.name || '';
        const lensName = LENS_TYPES.find(l => l.id === travelParams?.lens)?.name || '';
        const pitchName = PITCH_ANGLES.find(p => p.id === travelParams?.pitchAngle)?.name || '';
        const shotName = SHOT_TYPES.find(s => s.id === travelParams?.shotType)?.name || '';

        const prompt = `Generate a realistic travel photo of the person in the reference image.
Location: ${countryName} ${travelParams?.landmark ? `at ${travelParams.landmark}` : ''}
Season: ${seasonName}
Time of Day: ${timeName}
${festivalName ? `Festival: ${festivalName}` : ''}

Camera Settings:
- Shot Type: ${shotName}
- Camera Position: ${cameraPosName}
- Lens: ${lensName}
- Angle: ${pitchName}

Requirements:
- Keep the person's facial features consistent with the reference image.
- The person should be wearing clothes suitable for the season and location (e.g., Kimono in Kyoto, heavy coat in winter).
- Natural lighting and realistic texture.
- High resolution, 8k.
- Aspect Ratio: ${ratio}`;

        return [refImagePart, { text: prompt }].filter(part => part !== null);
    }
}
