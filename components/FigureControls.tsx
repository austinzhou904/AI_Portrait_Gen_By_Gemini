import React, { useEffect } from 'react';
import { FigureParams } from '../types';
import { DEFAULT_FIGURE_PROMPT, FIGURE_PRESETS } from '../constants/figureOptions';

interface FigureControlsProps {
    figureParams: FigureParams;
    onChange: (params: FigureParams) => void;
}

export const FigureControls: React.FC<FigureControlsProps> = ({
    figureParams,
    onChange
}) => {
    // Initialize with default prompt if empty
    useEffect(() => {
        if (!figureParams.prompt) {
            onChange({ ...figureParams, selectedPreset: 'scale_figure', prompt: DEFAULT_FIGURE_PROMPT });
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({ ...figureParams, prompt: e.target.value });
    };

    const handlePresetSelect = (presetId: string) => {
        const preset = FIGURE_PRESETS.find(p => p.id === presetId);
        if (preset) {
            onChange({ ...figureParams, selectedPreset: presetId, prompt: preset.prompt });
        }
    };

    const handleReset = () => {
        const preset = FIGURE_PRESETS.find(p => p.id === figureParams.selectedPreset) || FIGURE_PRESETS[0];
        onChange({ ...figureParams, prompt: preset.prompt });
    };

    return (
        <div className="space-y-4 animate-fadeIn">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-sm text-purple-200">
                <h3 className="font-bold mb-2 flex items-center">
                    <span className="mr-2">🧸</span> Figure Mode (手办模式)
                </h3>
                <p>
                    Turn your character into a high-quality 1/7 scale commercial figure.
                    You can modify the prompt below to customize the scene.
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Figure Style
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {FIGURE_PRESETS.map(preset => (
                        <button
                            key={preset.id}
                            onClick={() => handlePresetSelect(preset.id)}
                            className={`p-3 rounded-lg border text-left transition-all ${figureParams.selectedPreset === preset.id
                                ? 'bg-brand-600 border-brand-500 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                }`}
                        >
                            <div className="font-medium text-sm">{preset.name}</div>
                            <div className="text-[10px] opacity-70 truncate">{preset.description}</div>
                        </button>
                    ))}
                </div>

                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Generation Prompt
                    </label>
                    <button
                        onClick={handleReset}
                        className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
                    >
                        Reset to Default
                    </button>
                </div>
                <textarea
                    value={figureParams.prompt || ''}
                    onChange={handleChange}
                    rows={10}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent font-mono"
                    placeholder="Enter your prompt here..."
                />
            </div>
        </div>
    );
};
