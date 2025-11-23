import React from 'react';
import { HanfuParams } from '../types';
import { DYNASTIES, MAKEUP_STYLES, ACCESSORIES, BACKGROUND_STYLES } from '../constants/hanfuOptions';

interface HanfuControlsProps {
    hanfuParams: HanfuParams;
    onChange: (params: HanfuParams) => void;
}

export const HanfuControls: React.FC<HanfuControlsProps> = ({
    hanfuParams,
    onChange
}) => {
    return (
        <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-red-400 mb-2">🏮 传统汉服换装</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                    选择朝代风格、妆容、发饰配件，生成传统汉服写真。AI将完美保留您的面部特征，仅更换服饰妆容。
                </p>
            </div>

            {/* Dynasty Selection */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">
                    朝代风格 Dynasty Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {DYNASTIES.map((dynasty) => {
                        const isSelected = hanfuParams.selectedDynasty === dynasty.id;
                        return (
                            <button
                                key={dynasty.id}
                                onClick={() => onChange({ ...hanfuParams, selectedDynasty: dynasty.id })}
                                className={`group relative border rounded-lg p-4 transition-all text-left ${isSelected
                                    ? 'border-brand-500 ring-2 ring-brand-500/50 bg-brand-500/10'
                                    : 'border-slate-600 hover:border-brand-400 bg-slate-800/50'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-slate-200">{dynasty.name}</h4>
                                        <p className="text-xs text-slate-400 mt-1">{dynasty.description}</p>
                                    </div>
                                    {isSelected && (
                                        <div className="bg-brand-500 text-white rounded-full p-1 ml-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Makeup Selection */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">
                    妆容 Makeup Style
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {MAKEUP_STYLES.map((makeup) => {
                        const isSelected = hanfuParams.selectedMakeup === makeup.id;
                        return (
                            <button
                                key={makeup.id}
                                onClick={() => onChange({ ...hanfuParams, selectedMakeup: makeup.id })}
                                className={`relative border rounded-lg p-3 transition-all ${isSelected
                                    ? 'border-brand-500 ring-2 ring-brand-500/50 bg-brand-500/10'
                                    : 'border-slate-600 hover:border-brand-400 bg-slate-800/50'
                                    }`}
                            >
                                <div className="text-center">
                                    <h4 className="text-sm font-medium text-slate-200">{makeup.name}</h4>
                                    <p className="text-xs text-slate-400 mt-1">{makeup.description}</p>
                                </div>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-brand-500 text-white rounded-full p-0.5">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Accessories Selection */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">
                    发饰配件 Hair Accessories
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {ACCESSORIES.map((accessory) => {
                        const isSelected = hanfuParams.selectedAccessory === accessory.id;
                        return (
                            <button
                                key={accessory.id}
                                onClick={() => onChange({ ...hanfuParams, selectedAccessory: accessory.id })}
                                className={`relative border rounded-lg p-3 transition-all ${isSelected
                                    ? 'border-brand-500 ring-2 ring-brand-500/50 bg-brand-500/10'
                                    : 'border-slate-600 hover:border-brand-400 bg-slate-800/50'
                                    }`}
                            >
                                <div className="text-center">
                                    <h4 className="text-sm font-medium text-slate-200">{accessory.name}</h4>
                                    <p className="text-xs text-slate-400 mt-1">{accessory.description}</p>
                                </div>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-brand-500 text-white rounded-full p-0.5">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Background Selection */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">
                    背景风格 Background Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {BACKGROUND_STYLES.map((bg) => {
                        const isSelected = hanfuParams.selectedBackground === bg.id;
                        return (
                            <button
                                key={bg.id}
                                onClick={() => onChange({ ...hanfuParams, selectedBackground: bg.id })}
                                className={`relative border rounded-lg p-3 transition-all ${isSelected
                                    ? 'border-brand-500 ring-2 ring-brand-500/50 bg-brand-500/10'
                                    : 'border-slate-600 hover:border-brand-400 bg-slate-800/50'
                                    }`}
                            >
                                <div className="text-center">
                                    <h4 className="text-sm font-medium text-slate-200">{bg.name}</h4>
                                    <p className="text-xs text-slate-400 mt-1">{bg.description}</p>
                                </div>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-brand-500 text-white rounded-full p-0.5">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
