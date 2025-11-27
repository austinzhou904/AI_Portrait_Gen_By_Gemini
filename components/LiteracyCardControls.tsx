import React from 'react';
import { LiteracyCardParams } from '../types';

interface LiteracyCardControlsProps {
    params: LiteracyCardParams;
    onChange: (params: LiteracyCardParams) => void;
}

export const LiteracyCardControls: React.FC<LiteracyCardControlsProps> = ({ params, onChange }) => {
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...params, theme: e.target.value });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-300">
                    Theme (主题)
                </label>
                <input
                    type="text"
                    value={params.theme || ''}
                    onChange={handleThemeChange}
                    placeholder="e.g., Animal World (动物世界)..."
                    className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-slate-400">
                    Enter a theme for the educational poster (e.g., "Space Adventure", "Ocean Life").
                </p>
            </div>
        </div>
    );
};
