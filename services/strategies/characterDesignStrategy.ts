import { GenerationContext, GenerationStrategy } from './types';

export class CharacterDesignStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, characterDesignParams, ratio } = context;

        const customPrompt = characterDesignParams?.customPrompt || "";

        let prompt = `
你是一位顶尖的游戏与动漫概念美术设计大师 ，擅长制作详尽的角色设定图。你具备“像素级拆解”的能力，能够透视角色的穿着层级、捕捉微表情变化，并将与其相关的物品进行具象化还原。

任务目标:
根据用户上传或描述的主体形象，生成一张“全景式角色深度概念分解图”。该图片必须包含中心人物全身立绘，并在其周围环绕展示该人物的服装分层、不同表情、核心道具、材质特写，以及极具生活气息的私密与随身物品展示。

视觉规范:
1. 构图布局:
   - 中心位: 放置角色的全身立绘或主要动态姿势，作为视觉锚点。
   - 环绕位: 在中心人物四周空白处，有序排列拆解后的元素。
   - 视觉引导: 使用手绘箭头或引导线，将周边的拆解物品与中心人物的对应部位或所属区域（如包包连接手部）连接起来。

2. 拆解内容 —— 核心迭代区域:
   - 服装分层: 将角色的服装拆分为单品展示。如果是多层穿搭，需展示脱下外套后的内层状态。
   - 新增：私密内着拆解: 独立展示角色的内层衣物，重点突出设计感与材质。
   - 表情集: 在角落绘制 3-4 个不同的头部特写，展示不同的情绪。
   - 材质特写: 选取 1-2 个关键部位进行放大特写。
   - 新增：物品质感特写: 对小物件材质的描绘。
   - 关联物品: 此处不再局限于大型道具，需增加展示角色的“生活切片”。
   - 随身包袋与内容物: 绘制角色的日常通勤包或手拿包，并将其“打开”，展示散落在旁的物品。
   - 美妆与护理: 展示其常用的化妆品组合。
   - 私密生活物件: 具象化角色隐藏面的物品。根据角色性格可能包括：私密日记本或者更私人的物件。

3. 风格与注释:
   - 画风: 保持高质量的 2D 插画风格或概念设计草图风格，线条干净利落。
   - 背景: 使用米黄色、羊皮纸或浅灰色纹理背景，营造设计手稿的氛围。
   - 文字说明: 在每个拆解元素旁模拟手写注释，简要说明材质或品牌/型号暗示。

执行逻辑:
分析主体的核心特征、穿着风格及潜在性格。
提取可拆解的一级元素（外套、鞋子、大表情）。
脑补并设计二级深度元素（内衣风格？包里会有什么？）。
生成一张包含所有这些元素的组合图，确保透视准确，光影统一，注释清晰。
使用中文。

Technical Specs:
Aspect Ratio: ${ratio}.
`;

        if (customPrompt) {
            prompt += `\nAdditional Requirements:\n${customPrompt}`;
        }

        const parts: any[] = [{ text: prompt }];

        if (referenceImageBase64) {
            let mimeType = "image/png";
            let data = referenceImageBase64;

            if (referenceImageBase64.includes('data:')) {
                const matches = referenceImageBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
                if (matches && matches.length === 3) {
                    mimeType = matches[1];
                    data = matches[2];
                } else {
                    // Simple split fallback
                    data = referenceImageBase64.split(',')[1] || referenceImageBase64;
                }
            }

            parts.unshift({
                inlineData: {
                    mimeType: mimeType,
                    data: data
                }
            });
        }

        return parts;
    }
}
