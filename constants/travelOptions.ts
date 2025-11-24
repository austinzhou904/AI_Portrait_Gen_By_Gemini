export interface TravelOption {
    id: string;
    name: string;
    promptDetail: string;
}

// Expanded major travel destinations (50+ countries)
export const COUNTRIES: TravelOption[] = [
    // Asia
    { id: 'china', name: 'China (中国)', promptDetail: 'China, East Asian architecture, traditional Chinese scenery' },
    { id: 'japan', name: 'Japan (日本)', promptDetail: 'Japan, Japanese architecture, cherry blossoms, temples' },
    { id: 'korea', name: 'South Korea (韩国)', promptDetail: 'South Korea, Korean palaces, modern Seoul, hanok villages' },
    { id: 'thailand', name: 'Thailand (泰国)', promptDetail: 'Thailand, Buddhist temples, tropical beaches, Bangkok' },
    { id: 'singapore', name: 'Singapore (新加坡)', promptDetail: 'Singapore, modern city skyline, Marina Bay, Gardens by the Bay' },
    { id: 'indonesia', name: 'Indonesia (印尼)', promptDetail: 'Indonesia, Bali temples, tropical islands, rice terraces' },
    { id: 'vietnam', name: 'Vietnam (越南)', promptDetail: 'Vietnam, Ha Long Bay, ancient temples, colonial architecture' },
    { id: 'india', name: 'India (印度)', promptDetail: 'India, Taj Mahal, colorful culture, palaces' },
    { id: 'uae', name: 'UAE (阿联酋)', promptDetail: 'UAE, Dubai skyline, Burj Khalifa, modern architecture' },
    { id: 'turkey', name: 'Turkey (土耳其)', promptDetail: 'Turkey, Istanbul mosques, Cappadocia, historic sites' },

    // Europe
    { id: 'france', name: 'France (法国)', promptDetail: 'France, Eiffel Tower, Paris streets, French countryside' },
    { id: 'italy', name: 'Italy (意大利)', promptDetail: 'Italy, Roman Colosseum, Venice canals, Tuscan landscapes' },
    { id: 'uk', name: 'United Kingdom (英国)', promptDetail: 'UK, Big Ben, London, British castles' },
    { id: 'spain', name: 'Spain (西班牙)', promptDetail: 'Spain, Barcelona architecture, Spanish plazas, Mediterranean coast' },
    { id: 'germany', name: 'Germany (德国)', promptDetail: 'Germany, castles, Berlin landmarks, Bavarian countryside' },
    { id: 'switzerland', name: 'Switzerland (瑞士)', promptDetail: 'Switzerland, Alpine mountains, lakes, Swiss villages' },
    { id: 'netherlands', name: 'Netherlands (荷兰)', promptDetail: 'Netherlands, Amsterdam canals, windmills, tulip fields' },
    { id: 'greece', name: 'Greece (希腊)', promptDetail: 'Greece, Santorini white buildings, ancient ruins, Mediterranean sea' },
    { id: 'portugal', name: 'Portugal (葡萄牙)', promptDetail: 'Portugal, Lisbon tiles, coastal cliffs, historic towns' },
    { id: 'austria', name: 'Austria (奥地利)', promptDetail: 'Austria, Vienna palaces, Alpine scenery, Salzburg' },
    { id: 'czech', name: 'Czech Republic (捷克)', promptDetail: 'Czech Republic, Prague castle, historic squares, medieval architecture' },
    { id: 'russia', name: 'Russia (俄罗斯)', promptDetail: 'Russia, Red Square, St Petersburg palaces, onion domes' },
    { id: 'norway', name: 'Norway (挪威)', promptDetail: 'Norway, fjords, Northern lights, Scandinavian nature' },
    { id: 'sweden', name: 'Sweden (瑞典)', promptDetail: 'Sweden, Stockholm archipelago, Nordic architecture, forests' },
    { id: 'iceland', name: 'Iceland (冰岛)', promptDetail: 'Iceland, waterfalls, geysers, volcanic landscape, Northern lights' },

    // Americas
    { id: 'usa', name: 'United States (美国)', promptDetail: 'USA, New York skyline, American landmarks, diverse landscapes' },
    { id: 'canada', name: 'Canada (加拿大)', promptDetail: 'Canada, Rocky Mountains, Toronto skyline, natural parks' },
    { id: 'mexico', name: 'Mexico (墨西哥)', promptDetail: 'Mexico, Mayan ruins, colorful towns, Caribbean beaches' },
    { id: 'brazil', name: 'Brazil (巴西)', promptDetail: 'Brazil, Rio de Janeiro, Christ statue, tropical beaches' },
    { id: 'argentina', name: 'Argentina (阿根廷)', promptDetail: 'Argentina, Buenos Aires, Patagonia, wine country' },
    { id: 'peru', name: 'Peru (秘鲁)', promptDetail: 'Peru, Machu Picchu, Andes mountains, Inca ruins' },

    // Oceania
    { id: 'australia', name: 'Australia (澳大利亚)', promptDetail: 'Australia, Sydney Opera House, outback, Great Barrier Reef' },
    { id: 'newzealand', name: 'New Zealand (新西兰)', promptDetail: 'New Zealand, fjords, mountains, Lord of the Rings landscapes' },

    // Africa
    { id: 'egypt', name: 'Egypt (埃及)', promptDetail: 'Egypt, pyramids, Sphinx, Nile river, ancient temples' },
    { id: 'morocco', name: 'Morocco (摩洛哥)', promptDetail: 'Morocco, Marrakech markets, desert, colorful architecture' },
    { id: 'southafrica', name: 'South Africa (南非)', promptDetail: 'South Africa, Cape Town, Table Mountain, safari landscapes' },
];

export const SEASONS: TravelOption[] = [
    { id: 'spring', name: 'Spring (春季)', promptDetail: 'Spring season, blooming flowers, fresh greenery, mild weather' },
    { id: 'summer', name: 'Summer (夏季)', promptDetail: 'Summer season, bright sunshine, lush vegetation, warm atmosphere' },
    { id: 'autumn', name: 'Autumn (秋季)', promptDetail: 'Autumn season, golden leaves, harvest colors, crisp air' },
    { id: 'winter', name: 'Winter (冬季)', promptDetail: 'Winter season, snow, cold weather, winter light' },
];

export const FESTIVALS: TravelOption[] = [
    { id: 'none', name: 'None (无)', promptDetail: '' },
    { id: 'christmas', name: 'Christmas (圣诞节)', promptDetail: 'Christmas decorations, lights, festive atmosphere' },
    { id: 'newyear', name: 'New Year (新年)', promptDetail: 'New Year celebrations, fireworks, festive mood' },
    { id: 'cherry', name: 'Cherry Blossom (樱花季)', promptDetail: 'Cherry blossom season, pink flowers, spring atmosphere' },
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

export const CAMERA_POSITIONS: TravelOption[] = [
    { id: 'eye_level', name: 'Eye Level (平视)', promptDetail: 'Camera at eye level, natural perspective' },
    { id: 'low_angle', name: 'Low Angle (低角度)', promptDetail: 'Camera positioned low, looking upward' },
    { id: 'high_angle', name: 'High Angle (高角度)', promptDetail: 'Camera positioned high, looking downward' },
    { id: 'birds_eye', name: "Bird's Eye (鸟瞰)", promptDetail: 'Overhead view, top-down perspective' },
];

export const LENS_TYPES: TravelOption[] = [
    { id: 'wide_24mm', name: 'Wide Angle 24mm (广角)', promptDetail: '24mm wide angle lens, expansive field of view' },
    { id: 'standard_50mm', name: 'Standard 50mm (标准)', promptDetail: '50mm standard lens, natural perspective' },
    { id: 'portrait_85mm', name: 'Portrait 85mm (人像)', promptDetail: '85mm portrait lens, flattering compression' },
    { id: 'telephoto_135mm', name: 'Telephoto 135mm (长焦)', promptDetail: '135mm telephoto lens, compressed perspective' },
];

export const PITCH_ANGLES: TravelOption[] = [
    { id: 'level_0', name: 'Level 0° (水平)', promptDetail: 'Camera level, 0 degrees pitch' },
    { id: 'up_15', name: 'Slightly Up +15° (微仰)', promptDetail: 'Camera tilted slightly upward, +15 degrees' },
    { id: 'up_30', name: 'Up +30° (仰视)', promptDetail: 'Camera tilted upward, +30 degrees' },
    { id: 'down_15', name: 'Slightly Down -15° (微俯)', promptDetail: 'Camera tilted slightly downward, -15 degrees' },
    { id: 'down_30', name: 'Down -30° (俯视)', promptDetail: 'Camera tilted downward, -30 degrees' },
];

export const SHOT_TYPES: TravelOption[] = [
    { id: 'full_body', name: 'Full Body (全身)', promptDetail: 'Full body shot, showing the entire person from head to feet' },
    { id: 'half_body', name: 'Half Body (半身)', promptDetail: 'Medium shot, showing from waist/hips up' },
    { id: 'closeup', name: 'Close-up (面部特写)', promptDetail: 'Close-up portrait, focusing on face and upper shoulders' },
    { id: 'pov', name: 'POV (第一视角)', promptDetail: 'First-person perspective, as if the viewer is at the location' },
    { id: 'selfie', name: 'Selfie (自拍)', promptDetail: 'Selfie angle, arm extended holding camera, casual perspective' },
];
