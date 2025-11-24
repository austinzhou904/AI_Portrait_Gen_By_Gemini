export interface FigurePreset {
    id: string;
    name: string;
    description: string;
    prompt: string;
}

export const FIGURE_PRESETS: FigurePreset[] = [
    {
        id: 'scale_figure',
        name: '1/7 Scale Figure (手办)',
        description: 'High-quality commercial PVC figure with packaging and ZBrush background',
        prompt: `Create a high-quality 1/7 scale commercial PVC figure of the character from the reference image, blending realistic style with a detailed environment.
The figure is displayed on a computer desk, mounted on a clear, text-free circular acrylic base.
In the background, a computer monitor displays the ZBrush modeling interface of the same character. The model on the screen is a grey clay render (untextured) and perfectly matches the pose and details of the physical figure.
Next to the monitor, place a premium, Bandai-style collectible figure packaging box featuring the original character artwork.
The lighting should be professional product photography lighting, highlighting the texture and details of the figure.`
    },
    {
        id: 'youtooz',
        name: 'Youtooz Collectible (Q版)',
        description: '3D chibi-style vinyl collectible figure in packaging',
        prompt: `A 3D chibi-style vinyl collectible figure of the character. Big head, small body, cartoon proportion, Standing inside a Youtooz-style packaging box with: Transparent front window.
"YOUTOOZ COLLECTIBLES" logo on the top.
Number label (#001) on the top-left.
Bottom front text: Character Name and lower with smaller font "VINYL FIGURE".
Cartoon 2D illustration of the character on the side of the box.

Background/theme:
Abstract colorful background with iconic motifs related to the character.
Character Pose: Standing confidently or doing a signature gesture.
Outfit: Detailed signature outfit.

Face details: The facial features (mouth/eyes/details) must be fully 3D sculpted, not flat or printed.
Lighting: clean product photography look, minimal soft shadows.
Style: vinyl-toy aesthetic with a mix of matte + glossy accents depending on costume.
Composition: 3/4 product shot view, full box visible. The entire packaging box must be fully visible inside the frame with a clean margin around all edges.`
    }
];

export const DEFAULT_FIGURE_PROMPT = FIGURE_PRESETS[0].prompt;
