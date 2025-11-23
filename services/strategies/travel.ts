import { GenerationContext, GenerationStrategy } from './types';
import { COUNTRIES, SEASONS, FESTIVALS, TIMES_OF_DAY } from '../../constants/travelOptions';

export class TravelStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, travelParams, ratio } = context;

        if (!travelParams) {
            throw new Error("Travel parameters are required");
        }

        const { country, season, festival, landmark, timeOfDay } = travelParams;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        const selectedCountry = COUNTRIES.find(c => c.id === country);
        const selectedSeason = SEASONS.find(s => s.id === season);
        const selectedFestival = FESTIVALS.find(f => f.id === festival);
        const selectedTime = TIMES_OF_DAY.find(t => t.id === timeOfDay);

        const countryName = selectedCountry ? selectedCountry.promptDetail : country;
        const seasonDesc = selectedSeason ? selectedSeason.promptDetail : season;
        const festivalDesc = selectedFestival && selectedFestival.id !== 'none' ? selectedFestival.promptDetail : '';
        const timeDesc = selectedTime ? selectedTime.promptDetail : timeOfDay;

        const landmarkPrompt = landmark ? `Specific Landmark: ${landmark}` : '';

        let prompt = '';

        if (refImagePart) {
            // Person in Scene
            prompt = `
        Task: Generate a realistic travel photo of the person in the reference image.
        
        Location: ${countryName}
        ${landmarkPrompt}
        Season: ${seasonDesc}
        Time of Day: ${timeDesc}
        ${festivalDesc ? `Festival/Event: ${festivalDesc}` : ''}
        
        Requirements:
        1. IDENTITY: Keep the person's facial features and identity recognizable from the reference image.
        2. SCENE: The background must clearly look like ${countryName}. ${landmark ? `It MUST feature ${landmark} prominently.` : `It should feature iconic architecture or scenery of ${countryName}.`}
        3. ATMOSPHERE: Reflect the ${seasonDesc} atmosphere and ${timeDesc} lighting. ${festivalDesc ? `Include elements of ${festivalDesc}.` : ''}
        4. INTEGRATION: The person should look naturally integrated into the scene (lighting, shadows, perspective).
        5. STYLE: High-quality travel photography, DSLR, realistic lighting.
        6. CLOTHING: The person's clothing should be appropriate for the season and location (modern travel wear).
        `;
        } else {
            // Pure Scenery
            prompt = `
        Task: Generate a high-quality travel landscape photo.
        
        Location: ${countryName}
        ${landmarkPrompt}
        Season: ${seasonDesc}
        Time of Day: ${timeDesc}
        ${festivalDesc ? `Festival/Event: ${festivalDesc}` : ''}
        
        Requirements:
        1. SCENE: The image must clearly depict ${countryName}. ${landmark ? `It MUST feature ${landmark} prominently.` : `It should feature iconic architecture or scenery of ${countryName}.`}
        2. ATMOSPHERE: Reflect the ${seasonDesc} atmosphere and ${timeDesc} lighting. ${festivalDesc ? `Include elements of ${festivalDesc}.` : ''}
        3. STYLE: National Geographic style landscape photography, high resolution, realistic lighting, detailed textures.
        4. COMPOSITION: Professional composition, visually stunning.
        `;
        }

        return [refImagePart, { text: prompt }].filter(part => part !== null);
    }
}
