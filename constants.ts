import { AspectRatio, PresetScenario } from './types';

export const ASPECT_RATIOS = [
  { value: AspectRatio.Ratio_3_4, label: '3:4 Portrait', icon: '▭' },
  { value: AspectRatio.Ratio_4_3, label: '4:3 Landscape', icon: '▬' },
  { value: AspectRatio.Ratio_1_1, label: '1:1 Square', icon: '□' },
  { value: AspectRatio.Ratio_9_16, label: '9:16 Mobile', icon: '▯' },
  { value: AspectRatio.Ratio_16_9, label: '16:9 Cinema', icon: '▭' },
];

export const PRESETS: PresetScenario[] = [
  {
    id: 'professional',
    name: 'Professional Headshot',
    description: 'Clean studio lighting, suit or smart casual, neutral background.',
    promptModifier: 'Professional studio headshot, soft consistent lighting, neutral blurred office background, high-end photography, 8k resolution, sharp focus.',
    thumbnailUrl: 'https://picsum.photos/seed/pro/150/150'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    description: 'Futuristic city, neon lights, techwear aesthetics.',
    promptModifier: 'Cyberpunk style, neon lights reflecting on face, futuristic night city background, vibrant cyan and magenta colors, cinematic lighting, high detail.',
    thumbnailUrl: 'https://picsum.photos/seed/cyber/150/150'
  },
  {
    id: 'oilpainting',
    name: 'Renaissance Oil',
    description: 'Classic oil painting style, dramatic texture.',
    promptModifier: 'Oil painting style, Renaissance era aesthetics, visible brushstrokes, dramatic chiaroscuro lighting, classic art masterpiece, textured canvas look.',
    thumbnailUrl: 'https://picsum.photos/seed/oil/150/150'
  },
  {
    id: 'fantasy',
    name: 'Fantasy Warrior',
    description: 'Detailed armor, magical atmosphere, epic scenery.',
    promptModifier: 'Fantasy character portrait, wearing intricate magical armor, ethereal glow, epic fantasy landscape background, heroic pose, highly detailed digital art.',
    thumbnailUrl: 'https://picsum.photos/seed/fantasy/150/150'
  },
  {
    id: 'watercolor',
    name: 'Soft Watercolor',
    description: 'Artistic, dreamy, soft edges and pastel colors.',
    promptModifier: 'Watercolor painting style, soft pastel colors, dreamy atmosphere, artistic splashes, white paper texture background, delicate details.',
    thumbnailUrl: 'https://picsum.photos/seed/water/150/150'
  }
];