export interface TravelOption {
    id: string;
    name: string;
    promptDetail: string;
}

export const COUNTRIES: TravelOption[] = [
    { id: 'china', name: 'China (中国)', promptDetail: 'China' },
    { id: 'japan', name: 'Japan (日本)', promptDetail: 'Japan' },
    { id: 'korea', name: 'Korea (韩国)', promptDetail: 'South Korea' },
    { id: 'thailand', name: 'Thailand (泰国)', promptDetail: 'Thailand' },
    { id: 'france', name: 'France (法国)', promptDetail: 'France' },
    { id: 'uk', name: 'UK (英国)', promptDetail: 'United Kingdom' },
    { id: 'italy', name: 'Italy (意大利)', promptDetail: 'Italy' },
    { id: 'usa', name: 'USA (美国)', promptDetail: 'United States' },
    { id: 'egypt', name: 'Egypt (埃及)', promptDetail: 'Egypt' },
    { id: 'iceland', name: 'Iceland (冰岛)', promptDetail: 'Iceland' },
];

export const SEASONS: TravelOption[] = [
    { id: 'spring', name: 'Spring (春)', promptDetail: 'Spring season, blooming flowers, fresh green leaves' },
    { id: 'summer', name: 'Summer (夏)', promptDetail: 'Summer season, bright sunlight, vibrant colors, clear blue sky' },
    { id: 'autumn', name: 'Autumn (秋)', promptDetail: 'Autumn season, golden leaves, falling leaves, warm atmosphere' },
    { id: 'winter', name: 'Winter (冬)', promptDetail: 'Winter season, snow, cold atmosphere' },
];

export const FESTIVALS: TravelOption[] = [
    { id: 'none', name: 'None (无)', promptDetail: '' },
    { id: 'christmas', name: 'Christmas (圣诞节)', promptDetail: 'Christmas decorations, lights, festive atmosphere' },
    { id: 'new_year', name: 'New Year (新年)', promptDetail: 'New Year celebration, fireworks, festive' },
    { id: 'sakura', name: 'Sakura Season (樱花季)', promptDetail: 'Cherry blossoms everywhere, pink petals, romantic atmosphere' },
    { id: 'halloween', name: 'Halloween (万圣节)', promptDetail: 'Halloween decorations, pumpkins, spooky but fun atmosphere' },
    { id: 'valentine', name: 'Valentine (情人节)', promptDetail: 'Romantic atmosphere, hearts, roses' },
];

export const TIMES_OF_DAY: TravelOption[] = [
    { id: 'morning', name: 'Morning (上午)', promptDetail: 'Morning light, soft shadows, fresh atmosphere' },
    { id: 'noon', name: 'Noon (中午)', promptDetail: 'High noon, bright harsh sunlight, clear visibility' },
    { id: 'afternoon', name: 'Afternoon (下午)', promptDetail: 'Afternoon light, golden hour, warm tones' },
    { id: 'evening', name: 'Evening (晚上)', promptDetail: 'Evening, blue hour, city lights, romantic atmosphere' },
    { id: 'midnight', name: 'Midnight (午夜)', promptDetail: 'Midnight, dark sky, stars, dramatic lighting' },
];
