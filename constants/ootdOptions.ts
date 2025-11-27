export interface OOTDStyle {
    id: string;
    name: string;
    description: string;
    variables: {
        vibe: string;
        sidebarTitle: string;
        tags: string[];
        colors: string[];
        items: string[];
        outfitDescription: string;
        backgroundDescription: string;
    };
}

export interface OOTDDoll {
    id: string;
    name: string;
    prompt: string;
}

export interface OOTDScene {
    id: string;
    name: string;
    prompt: string;
}

export interface OOTDTime {
    id: string;
    name: string;
    prompt: string;
}

export const OOTD_SCENE_OPTIONS: OOTDScene[] = [
    { id: 'default', name: 'Default (默认)', prompt: '' },
    { id: 'sunny_street', name: 'Sunny Street (阳光街头)', prompt: 'a textured red brick wall on a sunny street' },
    { id: 'cafe', name: 'Cafe (咖啡馆)', prompt: 'a cozy cafe interior with warm lighting' },
    { id: 'park', name: 'Park (公园)', prompt: 'a lush green park with trees and benches' },
    { id: 'luxury_hotel', name: 'Luxury Hotel (豪华酒店)', prompt: 'a luxury hotel lobby with marble floors' },
    { id: 'cyberpunk_alley', name: 'Cyberpunk Alley (赛博巷弄)', prompt: 'a rainy cyberpunk alleyway with glowing neon signs' },
    { id: 'library', name: 'Library (图书馆)', prompt: 'an old university library exterior with ivy-covered walls' },
    { id: 'modern_city', name: 'Modern City (现代都市)', prompt: 'a busy modern city street with blurred pedestrians and skyscrapers' },
];

export const OOTD_TIME_OPTIONS: OOTDTime[] = [
    { id: 'default', name: 'Default (默认)', prompt: '' },
    { id: 'morning', name: 'Morning (清晨)', prompt: 'soft morning light' },
    { id: 'noon', name: 'Noon (正午)', prompt: 'bright noon sunlight' },
    { id: 'golden_hour', name: 'Golden Hour (黄金时刻)', prompt: 'golden hour light filtering through trees' },
    { id: 'night', name: 'Night (夜晚)', prompt: 'night time with artificial illumination' },
];

export const OOTD_DOLL_OPTIONS: OOTDDoll[] = [
    { id: 'none', name: 'None (无)', prompt: '' },
    { id: 'zimomo', name: 'Zimomo (Zimomo)', prompt: 'a massive, furry, half-human-height \'Zimomo\' style monster character' },
    { id: 'labubu', name: 'Labubu', prompt: 'a cute Labubu doll' },
    { id: 'pikachu', name: 'Pikachu (皮卡丘)', prompt: 'a cute Pikachu doll' },
    { id: 'doraemon', name: 'Doraemon (哆啦A梦)', prompt: 'a cute Doraemon doll' },
    { id: 'mickey_mouse', name: 'Mickey Mouse (米老鼠)', prompt: 'a cute Mickey Mouse doll' },
    { id: 'chopper', name: 'Chopper (乔巴)', prompt: 'a cute Tony Tony Chopper doll from One Piece' }
];

export const OOTD_STYLES: OOTDStyle[] = [
    {
        id: 'monster_twin',
        name: 'Monster Twin (怪兽双子)',
        description: 'Playful autumn vibe with a Zimomo companion.',
        variables: {
            vibe: 'Warm, playful, autumn atmosphere with soft sunlight hitting the brick textures',
            sidebarTitle: 'MONSTER TWIN STYLE',
            tags: ['Playful', 'Retro Cool', 'Best Buddies'],
            colors: ['Beige', 'Burgundy', 'Navy', 'Cream', 'Brick Red'],
            items: ['Newsboy Cap', 'Utility Jacket', 'Leather Boots'],
            outfitDescription: 'identical matching "Retro Detective" outfits: khaki utility jackets, plaid ties, and newsboy caps',
            backgroundDescription: 'a textured red brick wall on a sunny street'
        }
    },
    {
        id: 'city_walker',
        name: 'City Walker (都市行者)',
        description: 'Modern chic style for the urban explorer.',
        variables: {
            vibe: 'Sophisticated, energetic, morning city light with glass reflections',
            sidebarTitle: 'URBAN CHIC EDIT',
            tags: ['Modern', 'Effortless'],
            colors: ['Slate Grey', 'White', 'Denim Blue', 'Black'],
            items: ['Trench Coat', 'Designer Bag', 'White Sneakers'],
            outfitDescription: 'Oversized beige trench coat over a white tee and straight-leg jeans',
            backgroundDescription: 'A busy modern city street with blurred pedestrians and skyscrapers'
        }
    },
    {
        id: 'vintage_academy',
        name: 'Vintage Academy (复古学院)',
        description: 'Classic preppy look with a nostalgic touch.',
        variables: {
            vibe: 'Nostalgic, intellectual, golden hour light filtering through trees',
            sidebarTitle: 'ACADEMY ARCHIVE',
            tags: ['Preppy', 'Timeless'],
            colors: ['Forest Green', 'Brown', 'Mustard', 'Gold'],
            items: ['Leather Satchel', 'Loafers', 'Wool Blazer'],
            outfitDescription: 'Tweed blazer, pleated skirt, and a knit vest',
            backgroundDescription: 'An old university library exterior with ivy-covered walls'
        }
    },
    {
        id: 'cyber_street',
        name: 'Cyber Street (赛博街头)',
        description: 'Futuristic streetwear with neon accents.',
        variables: {
            vibe: 'Edgy, high-contrast, night time with neon sign illumination',
            sidebarTitle: 'FUTURE WEAR',
            tags: ['Tech', 'Streetwear'],
            colors: ['Neon Green', 'Black', 'Silver', 'Purple'],
            items: ['Techwear Jacket', 'Visor Sunglasses', 'High-top Sneakers'],
            outfitDescription: 'Black techwear jacket with many straps, cargo pants, and reflective accessories',
            backgroundDescription: 'A rainy cyberpunk alleyway with glowing neon signs'
        }
    }
];
