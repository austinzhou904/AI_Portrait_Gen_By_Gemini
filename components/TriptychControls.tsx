import React, { useState } from 'react';
import { TriptychParams } from '../types';
import { TRIPTYCH_PRESETS } from '../constants/triptychOptions';

interface TriptychControlsProps {
    triptychParams: TriptychParams;
    onChange: (params: TriptychParams) => void;
}

export const TriptychControls: React.FC<TriptychControlsProps> = ({
    triptychParams,
    onChange
}) => {
    const [showCustomPrompt, setShowCustomPrompt] = useState(false);

    const handlePresetSelect = (presetId: string) => {
        onChange({
            ...triptychParams,
            selectedPreset: presetId,
            customPrompt: undefined
        });
    };

    const handleCustomPromptChange = (prompt: string) => {
        onChange({
            ...triptychParams,
            customPrompt: prompt
        });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Preset Selection */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    选择三连拍场景 / シーンを選択
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {TRIPTYCH_PRESETS.map((preset) => {
                        const isSelected = triptychParams.selectedPreset === preset.id;
                        return (
                            <button
                                key={preset.id}
                                onClick={() => handlePresetSelect(preset.id)}
                                className={`group relative p-4 rounded-xl border text-left transition-all ${isSelected
                                        ? 'bg-brand-600 border-brand-500 shadow-lg ring-2 ring-brand-400'
                                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-brand-500'
                                    }`}
                            >
                                <div className={`font-medium text-sm mb-1 ${isSelected ? 'text-white' : 'text-white group-hover:text-brand-400'
                                    }`}>
                                    {preset.name}
                                </div>
                                <div className={`text-[10px] line-clamp-2 ${isSelected ? 'text-brand-100' : 'text-slate-400'
                                    }`}>
                                    {preset.description}
                                </div>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg">
                                        <svg className="w-3 h-3 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Custom Prompt Toggle */}
            <div>
                <button
                    onClick={() => setShowCustomPrompt(!showCustomPrompt)}
                    className="text-sm text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-2"
                >
                    <svg className={`w-4 h-4 transition-transform ${showCustomPrompt ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {showCustomPrompt ? '隐藏自定义Prompt' : '显示自定义Prompt (高级)'}
                </button>

                {showCustomPrompt && (
                    <div className="mt-3 animate-fadeIn">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            自定义日语Prompt (覆盖预设)
                        </label>
                        <textarea
                            value={triptychParams.customPrompt || ''}
                            onChange={(e) => handleCustomPromptChange(e.target.value)}
                            placeholder="输入自定义的日语prompt..."
                            rows={8}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent font-mono"
                        />
                        <div className="mt-2 text-xs text-slate-500">
                            💡 自定义prompt将覆盖选中的预设。留空则使用预设prompt。
                        </div>
                    </div>
                )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-xs text-blue-200">
                <div className="flex items-start">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <strong>三连拍模式说明：</strong>
                        <br />
                        • 选择一个场景预设，系统将生成水平三分割的艺术照片
                        <br />
                        • 上段：眼睛特写 | 中段：人物中景 | 下段：细节特写
                        <br />
                        • 所有prompt基于日语摄影风格，保留原汁原味的表达
                        <br />
                        • 建议上传人物正面清晰照片以获得最佳效果
                    </div>
                </div>
            </div>
        </div>
    );
};
