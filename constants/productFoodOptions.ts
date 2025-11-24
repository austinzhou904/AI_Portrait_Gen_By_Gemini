// Product & Food Preset Options
// 商品与美食预设选项

export interface ProductFoodPreset {
    id: string;
    name: string;
    description: string;
    prompt: string;
    icon: string;
}

export const PRODUCT_FOOD_PRESETS: ProductFoodPreset[] = [
    {
        id: 'ultimate_rice_bowl',
        name: '最强盖饭 (Ultimate Rice Bowl)',
        description: '在白米饭上生成极致美味的配料，写实画风，令人垂涎',
        prompt: `在这碗白米饭上，生成极致美味的配料（如：堆成山的极品和牛、闪闪发光的生鱼片、溢出来的鱼子酱）。
画风要极其写实，让人看了流口水。
灯光要温暖，突显食物的色泽和纹理。
米饭要粒粒分明，晶莹剔透。
整体氛围要充满食欲，像高级餐厅的宣传照。`,
        icon: '🍚'
    },
    {
        id: 'product_photography',
        name: '商品摄影 (Product Photography)',
        description: '为商品生成高级背景，调整光影，自然融合',
        prompt: `把这个商品放在一个高级的背景中（如：充满阳光的高级咖啡厅木桌、霓虹灯闪烁的未来都市街道、极简主义的大理石台面）。
调整光影，让商品看起来自然地融入环境。
产生真实的倒影和阴影。
保持商品的原始细节清晰可见。
整体风格要像专业的商业广告摄影。`,
        icon: '🛍️'
    }
];
