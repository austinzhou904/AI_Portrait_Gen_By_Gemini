import React from 'react';
import { CharacterDesignParams } from '../types';

interface CharacterDesignControlsProps {
    params: CharacterDesignParams;
    onChange: (params: CharacterDesignParams) => void;
}

const CharacterDesignControls: React.FC<CharacterDesignControlsProps> = ({
    params,
    onChange,
}) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Additional Design Notes (Optional)
                </label>
                <textarea
                    value={params.customPrompt || ''}
                    onChange={(e) => onChange({ ...params, customPrompt: e.target.value })}
                    placeholder="e.g., Cyberpunk style, holding a katana..."
                    className="w-full h-24 bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none placeholder-slate-500"
                />
                <p className="text-xs text-slate-500 mt-2">
                    The system will automatically generate a detailed character sheet including full body, clothing breakdown, expressions, and items. Use this field to add specific details.
                </p>
            </div>
        </div>
    );
};

export default CharacterDesignControls;
