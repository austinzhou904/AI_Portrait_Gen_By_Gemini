import React, { useState } from 'react';
import { ProductFoodParams } from '../types';
import { PRODUCT_FOOD_PRESETS } from '../constants/productFoodOptions';

interface ProductFoodControlsProps {
    productFoodParams: ProductFoodParams;
    onChange: (params: ProductFoodParams) => void;
}

export const ProductFoodControls: React.FC<ProductFoodControlsProps> = ({
    productFoodParams,
    onChange
}) => {
    const [showCustomPrompt, setShowCustomPrompt] = useState(false);

    const handlePresetSelect = (presetId: string) => {
        onChange({
            ...productFoodParams,
            selectedPreset: presetId,
            customPrompt: undefined
        });
    };

    const handleCustomPromptChange = (prompt: string) => {
        onChange({
            ...productFoodParams,
            customPrompt: prompt
        });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Preset Selection */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    选择摄影类型 / Choose Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {PRODUCT_FOOD_PRESETS.map((preset) => {
                        const isSelected = productFoodParams.selectedPreset === preset.id;
                        return (
                            <button
                                key={preset.id}
                                onClick={() => handlePresetSelect(preset.id)}
                                className={`group relative p-4 rounded-xl border text-left transition-all ${isSelected
                                        ? 'bg-brand-600 border-brand-500 shadow-lg ring-2 ring-brand-400'
                                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-brand-500'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-2xl">{preset.icon}</div>
                                    {isSelected && (
                                        <div className="bg-white rounded-full p-1 shadow-lg">
                                            <svg className="w-3 h-3 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className={`font-medium text-sm mb-1 ${isSelected ? 'text-white' : 'text-white group-hover:text-brand-400'
                                    }`}>
                                    {preset.name}
                                </div>
                                <div className={`text-[10px] line-clamp-2 ${isSelected ? 'text-brand-100' : 'text-slate-400'
                                    }`}>
                                    {preset.description}
                                </div>
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
                            自定义Prompt (覆盖预设)
                        </label>
                        <textarea
                            value={productFoodParams.customPrompt || ''}
                            onChange={(e) => handleCustomPromptChange(e.target.value)}
                            placeholder="输入自定义的prompt..."
                            rows={4}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                        <div className="mt-2 text-xs text-slate-500">
                            💡 自定义prompt将覆盖选中的预设。留空则使用预设prompt。
                        </div>
                    </div>
                )}
            </div>

            {/* Info Box */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-xs text-orange-200">
                <div className="flex items-start">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <strong>商品与美食模式说明：</strong>
                        <br />
                        • 专为静物摄影设计，强调光影和质感
                        <br />
                        • 最强盖饭：生成极致诱人的美食
                        <br />
                        • 商品摄影：为您的产品生成高级商业背景
                    </div>
                </div>
            </div>
        </div>
    );
};
