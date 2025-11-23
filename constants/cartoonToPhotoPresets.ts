import { CharacterPreset } from '../types';

// 卡通转真人照片 - 角色预设
// displayName: 显示给用户看
// promptName: 在AI prompt中使用（包含美化定语）

export const CARTOON_TO_PHOTO_PRESETS: CharacterPreset[] = [
    // 年轻女性
    {
        id: 'japanese_young_woman',
        displayName: '日本少女',
        promptName: '超美日本少女',
        ethnicity: 'East Asian (Japanese)',
        ageGroup: '18-25岁',
        gender: '女性'
    },
    {
        id: 'korean_young_woman',
        displayName: '韩国少女',
        promptName: '超美韩国少女',
        ethnicity: 'East Asian (Korean)',
        ageGroup: '18-25岁',
        gender: '女性'
    },
    {
        id: 'chinese_young_woman',
        displayName: '中国少女',
        promptName: '超美中国少女',
        ethnicity: 'East Asian (Chinese)',
        ageGroup: '18-25岁',
        gender: '女性'
    },
    {
        id: 'caucasian_young_woman',
        displayName: '欧美少女',
        promptName: '超美欧美少女',
        ethnicity: 'Caucasian',
        ageGroup: '18-25岁',
        gender: '女性'
    },
    {
        id: 'african_young_woman',
        displayName: '非裔少女',
        promptName: '超美非裔少女',
        ethnicity: 'African',
        ageGroup: '18-25岁',
        gender: '女性'
    },
    {
        id: 'south_asian_young_woman',
        displayName: '南亚少女',
        promptName: '超美南亚少女',
        ethnicity: 'South Asian',
        ageGroup: '18-25岁',
        gender: '女性'
    },

    // 年轻男性
    {
        id: 'japanese_young_man',
        displayName: '日本少年',
        promptName: '超帅日本少年',
        ethnicity: 'East Asian (Japanese)',
        ageGroup: '18-25岁',
        gender: '男性'
    },
    {
        id: 'korean_young_man',
        displayName: '韩国少年',
        promptName: '超帅韩国少年',
        ethnicity: 'East Asian (Korean)',
        ageGroup: '18-25岁',
        gender: '男性'
    },
    {
        id: 'chinese_young_man',
        displayName: '中国帅哥',
        promptName: '超帅中国小伙',
        ethnicity: 'East Asian (Chinese)',
        ageGroup: '18-25岁',
        gender: '男性'
    },
    {
        id: 'caucasian_young_man',
        displayName: '欧美帅哥',
        promptName: '超帅欧美小伙',
        ethnicity: 'Caucasian',
        ageGroup: '18-25岁',
        gender: '男性'
    },
    {
        id: 'african_young_man',
        displayName: '非裔帅哥',
        promptName: '超帅非裔小伙',
        ethnicity: 'African',
        ageGroup: '18-25岁',
        gender: '男性'
    },

    // 中年
    {
        id: 'middle_aged_woman',
        displayName: '中年女性',
        promptName: '优雅中年女性',
        ethnicity: 'East Asian',
        ageGroup: '35-50岁',
        gender: '女性'
    },
    {
        id: 'middle_aged_man',
        displayName: '中年男性',
        promptName: '成熟稳重中年男性',
        ethnicity: 'East Asian',
        ageGroup: '35-50岁',
        gender: '男性'
    },

    // 老年
    {
        id: 'elderly_woman',
        displayName: '慈祥老人',
        promptName: '慈祥和蔼的老奶奶',
        ethnicity: 'East Asian',
        ageGroup: '60-80岁',
        gender: '女性'
    },
    {
        id: 'elderly_man',
        displayName: '矍铄老者',
        promptName: '矍铄精神的老爷爷',
        ethnicity: 'East Asian',
        ageGroup: '60-80岁',
        gender: '男性'
    },
];
