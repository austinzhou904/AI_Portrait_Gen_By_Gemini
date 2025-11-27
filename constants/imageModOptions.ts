export interface ImageModPreset {
    id: string;
    name: string;
    description: string;
    prompt: string;
}

export const IMAGE_MOD_PRESETS: ImageModPreset[] = [
    {
        id: 'hd_upscale',
        name: '修旧如旧 (HD Upscale)',
        description: 'Enhance resolution and detail using artistic super-resolution.',
        prompt: 'Upscale this image using an artistic super-resolution process. Enrich it with micro-textures, fine-grain detail, depth enhancements, and creative accents that elevate visual complexity without distorting the core subject. Colorize the image. Adjust saturation, contrast, and white balance to achieve a master-level quality.'
    },
    {
        id: 'restore_old_photo',
        name: '修旧如新 (Restore Old Photo)',
        description: 'Modernize vintage photos with realistic color and texture.',
        prompt: 'Ultra-realistic recreation of an old vintage photo, keeping the same original face (99% likeness, no alteration). Transform into a modern high-quality digital portrait with vibrant updated colors, smooth realistic skin textures, and natural lighting. The outfit and background should be upgraded into a clean, modern aesthetic while preserving the authenticity of the original pose and expression.'
    }
];

export const DEFAULT_IMAGE_MOD_PARAMS = {
    selectedPreset: 'hd_upscale',
    customPrompt: ''
};
