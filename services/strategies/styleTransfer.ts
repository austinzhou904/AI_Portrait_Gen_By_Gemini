import { GenerationContext, GenerationStrategy } from './types';

export class StyleTransferStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, styleDirection, cartoonStyle, ethnicity } = context;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        let stylePrompt = '';

        if (styleDirection === 'photo_to_cartoon') {
            let styleDesc = "high-quality 3D animated movie style (Pixar/Disney style)";
            let styleRules = "Use soft lighting, vibrant colors, smooth textures, and large expressive eyes typical of 3D animation.";

            if (cartoonStyle === 'ghibli') {
                styleDesc = "Studio Ghibli anime style (Hayao Miyazaki)";
                styleRules = "Use hand-drawn aesthetic, lush backgrounds, soft natural lighting, and characteristic Ghibli character design.";
            } else if (cartoonStyle === 'toriyama') {
                styleDesc = "Akira Toriyama anime style (Dragon Ball Z)";
                styleRules = "Use bold outlines, dynamic shading, distinct muscular definition (if applicable), and Toriyama's signature eye and face shapes.";
            } else if (cartoonStyle === 'katsura') {
                styleDesc = "Masakazu Katsura manga/anime style (Video Girl Ai, I\"s)";
                styleRules = "Use delicate line work, realistic yet stylized facial features, detailed hair, and soft, romantic shading.";
            } else if (cartoonStyle === 'shinkai') {
                styleDesc = "Makoto Shinkai anime style (Your Name, Weathering with You)";
                styleRules = "Use hyper-realistic backgrounds, dramatic lighting (lens flares, sunsets), high contrast, and detailed character designs.";
            }

            stylePrompt = `
        Task: Style Transfer - Photo to ${cartoonStyle === '3d_cartoon' ? '3D Cartoon' : 'Anime/Manga'}.
        
        Instruction:
        Convert the attached photo into a ${styleDesc}.
        
        Strict Rules:
        1. IDENTITY: Keep the person's facial features, expression, and pose recognizable.
        2. STYLE: ${styleRules}
        3. BACKGROUND: Adapt the background to match the chosen art style.
        4. OUTPUT: High-quality render/illustration.
      `;
        } else {
            // Cartoon to Photo - 使用中文提示词和美化定语
            const ethnicityMap: Record<string, { promptName: string, ethnicity: string, ageGroup: string, gender: string }> = {
                'east_asian': { promptName: '超美东亚少女', ethnicity: 'East Asian', ageGroup: '18-25岁', gender: '女性' },
                'caucasian': { promptName: '超美欧美少女', ethnicity: 'Caucasian', ageGroup: '18-25岁', gender: '女性' },
                'african': { promptName: '超美非裔少女', ethnicity: 'African', ageGroup: '18-25岁', gender: '女性' },
                'south_asian': { promptName: '超美南亚少女', ethnicity: 'South Asian', ageGroup: '18-25岁', gender: '女性' },
                'hispanic': { promptName: '超美拉丁少女', ethnicity: 'Hispanic/Latino', ageGroup: '18-25岁', gender: '女性' },
                'none': { promptName: '写实化角色', ethnicity: 'Any', ageGroup: '不限', gender: '不限' }
            };

            const selectedEthnicity = ethnicity || 'east_asian';
            const charConfig = ethnicityMap[selectedEthnicity] || ethnicityMap['east_asian'];

            const ethnicityInstruction = selectedEthnicity === 'none'
                ? '1. 族裔/物种特征：严格保持原图角色的生物特征（无论是人类、动物还是虚构生物）。不要强行将其转化为人类女性。'
                : `1. 族裔特征（关键）：必须是${charConfig.ethnicity}族裔。这是优先约束。调整肤色、面部结构和特征以清楚地反映${charConfig.ethnicity}族裔特征。`;

            const genderInstruction = selectedEthnicity === 'none'
                ? '3. 性别：保持原图角色的性别特征（如果是无性别或非人类，保持原样）。'
                : `3. 性别：${charConfig.gender}`;

            stylePrompt = `
        Task: 卡通转真人照片

        请求：给我看看图1的【${charConfig.promptName}】的照片版本
        
        详细技术要求：
        ${ethnicityInstruction}
        2. 年龄段：${charConfig.ageGroup}
        ${genderInstruction}
        4. 结构一致性（最高优先级）：**严格保持原图的构图和画面结构**。人物在画面中的位置、大小、比例必须与原图完全一致。背景的布局和透视也必须与原图保持一致。就像是在同一个场景中拍摄的真人版。
        5. 身份保持：将卡通特征转化为真实物理质感，同时保留角色的精髓、表情和独特解剖结构。
        6. 审美风格（关键）：**高端商业人像摄影**。必须保持角色的美貌和魅力。人物面部必须精致、五官端正、符合主流审美。拒绝丑化、扭曲或过于粗糙的面部特征。
        7. 极致真实感：结果必须是**RAW格式摄影照片**。严禁出现3D渲染感、塑料感或插画风格。
        8. 皮肤质感：展示**年轻、健康、细腻**的真实皮肤。保留自然的皮肤纹理和毛孔，但**不要**添加过多的皱纹、斑点或瑕疵，除非原图角色有这些特征。
        9. 光影效果：使用柔和的影棚布光或自然光（如蝴蝶光、伦勃朗光），使面部立体且肤色通透。
        10. 材质细节：头发要有真实的发丝感和光泽，衣物要有清晰的织物纹理。
        11. 摄影参数：模拟 85mm 人像镜头，f/1.8 大光圈，浅景深，背景虚化，焦内锐利。
        12. 输出质量：8k分辨率，超高清，电影级质感，杂志封面级水准。
      `;
        }

        return [refImagePart, { text: stylePrompt }].filter(part => part !== null);
    }
}
