import { HanfuOption, MakeupOption, AccessoryOption } from '../types';

export const DYNASTIES: HanfuOption[] = [
    {
        id: 'tang',
        name: '唐朝 · 齐胸儒裙',
        period: 'Tang Dynasty',
        description: '雍容华贵，展现盛唐气象。',
        imagePrompt: 'Tang Dynasty style Ruqun Hanfu, high-waisted skirt tied above the chest, rich vibrant colors, elegant silk textures, traditional Chinese embroidery',
    },
    {
        id: 'song',
        name: '宋朝 · 褙子宋裤',
        period: 'Song Dynasty',
        description: '清雅简约，尽显文人风骨。',
        imagePrompt: 'Song Dynasty style Hanfu, long Beizi coat over inner garments, straight aesthetics, soft pastel colors, elegant and minimalist',
    },
    {
        id: 'ming',
        name: '明朝 · 袄裙',
        period: 'Ming Dynasty',
        description: '端庄大气，马面裙经典搭配。',
        imagePrompt: 'Ming Dynasty style Aoqun Hanfu, embroidered upper garment with standing collar, pleated Mamian skirt, majestic and structured',
    },
    {
        id: 'wei-jin',
        name: '魏晋 · 晋制大袖衫',
        period: 'Wei & Jin',
        description: '飘逸洒脱，仙气缭绕。',
        imagePrompt: 'Wei and Jin Dynasty style wide-sleeved Hanfu, loose fitting, flowing layers, ethereal fairy-like aesthetic',
    },
];

export const MAKEUP_STYLES: MakeupOption[] = [
    {
        id: 'natural',
        name: '清透裸妆',
        description: '现代审美与古典结合，自然提气。',
        promptDetail: 'natural fresh makeup, clear skin',
    },
    {
        id: 'huadian',
        name: '花钿妆',
        description: '眉心贴花，古典妩媚。',
        promptDetail: 'traditional Chinese Huadian makeup, floral design on forehead between eyebrows, red lips, pink blush',
    },
    {
        id: 'mianye',
        name: '面靥妆',
        description: '酒窝处点红，俏皮可爱。',
        promptDetail: 'traditional Mianye makeup, red dots near dimples, delicate eyebrows, cherry red lips',
    },
];

export const ACCESSORIES: AccessoryOption[] = [
    {
        id: 'minimal',
        name: '简约发带',
        description: '简单束发，清新自然。',
        promptDetail: 'simple silk hair ribbon, minimal hair ornaments',
    },
    {
        id: 'buyao',
        name: '金步摇',
        description: '一步一摇，顾盼生姿。',
        promptDetail: 'luxurious golden Buyao hairpin, dangling tassels, intricate jewelry',
    },
    {
        id: 'diancui',
        name: '点翠发簪',
        description: '蓝羽点缀，华丽非凡。',
        promptDetail: 'traditional Kingfisher feather art (Diancui) hairpin, vibrant blue and gold intricate hairpiece',
    },
];

export const BACKGROUND_STYLES: import('../types').HanfuBackgroundOption[] = [
    {
        id: 'gongbi',
        name: '工笔画风',
        description: '细腻典雅，线条优美，传统中国画风。',
        promptDetail: 'Traditional Chinese Gongbi painting style background, meticulous brushwork, elegant and detailed, soft colors, ink wash texture, artistic composition',
    },
    {
        id: 'shuimo',
        name: '水墨写意',
        description: '气韵生动，挥洒自如，极具艺术感。',
        promptDetail: 'Traditional Chinese Ink Wash painting style background, abstract and artistic, black and white ink strokes, misty mountains, poetic atmosphere',
    },
    {
        id: 'garden',
        name: '中式园林',
        description: '亭台楼阁，小桥流水，现实场景。',
        promptDetail: 'Real photography background, Traditional Chinese Garden, ancient architecture, pavilion, pond, willow trees, soft natural lighting',
    },
    {
        id: 'minimal',
        name: '纯色典雅',
        description: '简约背景，突出人物主体。',
        promptDetail: 'Minimalist studio background, solid color with subtle texture, elegant and clean, focusing on the subject',
    },
];
