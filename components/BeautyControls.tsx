import React from 'react';
import { BeautyParams } from '../types';
import { BEAUTY_OPTIONS } from '../constants/beautyOptions';

interface BeautyControlsProps {
    params: BeautyParams;
    onChange: (params: BeautyParams) => void;
}

export const BeautyControls: React.FC<BeautyControlsProps> = ({ params, onChange }) => {
    const { selectedOptions } = params;

    const toggleOption = (id: string) => {
        const newOptions = selectedOptions.includes(id)
            ? selectedOptions.filter(optId => optId !== id)
            : [...selectedOptions, id];
        onChange({ ...params, selectedOptions: newOptions });
    };

    // Group options by category
    const categories = Array.from(new Set(BEAUTY_OPTIONS.map(opt => opt.category)));

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-white mb-2">Beauty Retouching</h3>
                <p className="text-sm text-slate-400 mb-4">
                    Select the enhancements you want to apply. You can combine multiple options.
                </p>
            </div>

            <div className="space-y-4">
                {categories.map(category => (
                    <div key={category}>
                        <h4 className="text-sm font-medium text-slate-300 mb-2 capitalize">
                            {category}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {BEAUTY_OPTIONS.filter(opt => opt.category === category).map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => toggleOption(option.id)}
                                    className={`p-3 rounded-lg border text-left transition-all ${selectedOptions.includes(option.id)
                                            ? 'bg-brand-600 border-brand-500 text-white'
                                            : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{option.label}</div>
                                    <div className="text-xs opacity-70 mt-1 truncate" title={option.prompt}>
                                        {option.prompt}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
