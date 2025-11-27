import React from 'react';
import { OOTDParams } from '../types';
import { OOTD_STYLES, OOTD_DOLL_OPTIONS, OOTD_SCENE_OPTIONS, OOTD_TIME_OPTIONS } from '../constants/ootdOptions';

interface OOTDControlsProps {
    params: OOTDParams;
    onChange: (params: OOTDParams) => void;
}

export const OOTDControls: React.FC<OOTDControlsProps> = ({ params, onChange }) => {
    const handleStyleSelect = (styleId: string) => {
        onChange({ ...params, selectedStyle: styleId });
    };

    const handleClothingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...params, clothing: e.target.value });
    };

    const handleSceneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ ...params, location: e.target.value });
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ ...params, timeOfDay: e.target.value });
    };

    const handleDollChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ ...params, doll: e.target.value });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-300">
                    Select Style (选择风格)
                </label>
                <div className="grid grid-cols-1 gap-3">
                    {OOTD_STYLES.map((style) => (
                        <button
                            key={style.id}
                            onClick={() => handleStyleSelect(style.id)}
                            className={`p-4 rounded-xl border text-left transition-all ${params.selectedStyle === style.id
                                ? 'bg-brand-500/20 border-brand-500 ring-1 ring-brand-500'
                                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                                }`}
                        >
                            <div className="font-medium text-slate-200">{style.name}</div>
                            <div className="text-xs text-slate-400 mt-1">{style.description}</div>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {style.variables.tags.map((tag, index) => (
                                    <span key={index} className="px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400 text-[10px]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-700/50">
                <h3 className="text-sm font-medium text-slate-300">Customization (Optional)</h3>

                <div className="space-y-2">
                    <label className="block text-xs text-slate-400">
                        Override Outfit (覆盖服装描述)
                    </label>
                    <input
                        type="text"
                        value={params.clothing || ''}
                        onChange={handleClothingChange}
                        placeholder="e.g., Red silk dress and heels..."
                        className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-xs text-slate-400">
                        Scene (场景)
                    </label>
                    <select
                        value={params.location || 'default'}
                        onChange={handleSceneChange}
                        className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                    >
                        {OOTD_SCENE_OPTIONS.map((scene) => (
                            <option key={scene.id} value={scene.id}>
                                {scene.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs text-slate-400">
                        Time of Day (时间)
                    </label>
                    <select
                        value={params.timeOfDay || 'default'}
                        onChange={handleTimeChange}
                        className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                    >
                        {OOTD_TIME_OPTIONS.map((time) => (
                            <option key={time.id} value={time.id}>
                                {time.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs text-slate-400">
                        Doll Companion (玩偶伴侣)
                    </label>
                    <select
                        value={params.doll || 'none'}
                        onChange={handleDollChange}
                        className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                    >
                        {OOTD_DOLL_OPTIONS.map((doll) => (
                            <option key={doll.id} value={doll.id}>
                                {doll.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
