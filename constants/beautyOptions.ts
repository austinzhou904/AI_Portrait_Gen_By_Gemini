export interface BeautyOption {
    id: string;
    label: string;
    prompt: string;
    category: 'restoration' | 'lighting' | 'structure' | 'skin' | 'general';
}

export const BEAUTY_OPTIONS: BeautyOption[] = [
    // User provided
    {
        id: 'restore_texture',
        label: 'Restore Micro-texture',
        prompt: 'avoid smoothing; restore subtle pores and micro-texture only',
        category: 'restoration'
    },
    {
        id: 'natural_glow',
        label: 'Natural Glow',
        prompt: 'keep original highlights; reduce plastic shine; maintain soft natural glow',
        category: 'lighting'
    },
    {
        id: 'remove_plastic',
        label: 'Remove Plastic Feel',
        prompt: 'preserve natural blush; remove artificial resin-like skin effect',
        category: 'skin'
    },
    {
        id: 'realistic_lighting',
        label: 'Realistic Lighting',
        prompt: 'keep lighting direction identical; enhance realistic shadow fall-off',
        category: 'lighting'
    },
    {
        id: 'preserve_structure',
        label: 'Preserve Face Structure',
        prompt: 'do not modify face shape, proportions, or expression',
        category: 'structure'
    },
    // Common
    {
        id: 'brighten_eyes',
        label: 'Brighten Eyes',
        prompt: 'enhance eye clarity and brightness, natural sparkle',
        category: 'general'
    },
    {
        id: 'smooth_skin',
        label: 'Soft Skin Smoothing',
        prompt: 'gentle skin smoothing while retaining texture, remove blemishes',
        category: 'skin'
    },
    {
        id: 'whitening',
        label: 'Natural Whitening',
        prompt: 'slight skin tone brightening, natural fair skin',
        category: 'skin'
    }
];
