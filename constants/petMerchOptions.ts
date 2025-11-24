// Pet & Merch Preset Options
// 萌宠与周边预设选项

export interface PetMerchPreset {
    id: string;
    name: string;
    description: string;
    prompt: string;
    icon: string;
}

export const PET_MERCH_PRESETS: PetMerchPreset[] = [
    {
        id: 'pet_stamp',
        name: '宠物印章 (Pet Stamp)',
        description: '可爱的线条风格贴纸，保留面部特征，画风简单可爱 (Kawaii)',
        prompt: `将这张宠物的照片制作成一个可爱的线条风格贴纸（Sticker）或印章。
保留它的面部特征，但画风要简单、可爱（Kawaii）。
背景为白色。
线条要平滑，色彩要明亮，适合做成表情包或贴纸。`,
        icon: '🐾'
    },
    {
        id: 'hanko',
        name: '日式印章 (Hanko)',
        description: '传统的红色圆形印章风格，白底红泥，线条清晰',
        prompt: `把这张图片里的主体（人物或宠物）设计成一个红色的日本圆形印章（Hanko）。
背景要是白色的。
线条要清晰，风格要像传统的朱肉印章。
只保留主要特征的轮廓，使用单色红色（朱红色）。
整体呈现出一种复古、正式但又有趣的印章效果。`,
        icon: '💮'
    },
    {
        id: 'gachapon',
        name: '扭蛋玩具 (Gachapon)',
        description: '装在透明塑料球里的精致玩具模型，具有光泽感和塑料质感',
        prompt: `把这张照片里的主体变成一个放在透明塑料扭蛋球里的精致玩具模型。
背景是虚化的扭蛋机内部，有其他彩色的扭蛋球。
玩具要有强烈的光泽感，看起来像高品质的PVC或塑料材质。
扭蛋球是透明的，可以看到里面的玩具细节。
光线要明亮，突出玩具的立体感和质感。`,
        icon: '💊'
    },
    {
        id: 'package_sticker',
        name: '定制包装 (Sticker on Package)',
        description: '将生成的图像自然地贴在立体物体（如氧气瓶、杯子）上',
        prompt: `将这张图片设计成一个时尚的贴纸，并把它自然地贴在一个银色的氧气瓶或咖啡杯上。
背景要模糊处理，焦点在贴纸上。
贴纸要顺应物体的曲面弯曲，光影要自然，看起来就像是真的贴在上面一样。
贴纸的设计要现代、潮流，边缘要有轻微的厚度感。`,
        icon: '🏷️'
    }
];
