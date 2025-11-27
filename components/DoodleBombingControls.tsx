import React from 'react';
import { DoodleBombingParams } from '../types';
import { DOODLE_STYLES, DOODLE_BACKGROUNDS, EXPRESSION_OPTIONS, BODY_POSE_OPTIONS, TIME_OF_DAY_OPTIONS } from '../constants/doodleBombingOptions';

interface DoodleBombingControlsProps {
    params: DoodleBombingParams;
    onChange: (params: DoodleBombingParams) => void;
}

export const DoodleBombingControls: React.FC<DoodleBombingControlsProps> = ({ params, onChange }) => {

    // Helper component for select fields
    const SelectField = ({ label, value, options, onChange: onFieldChange }: any) => (
        <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
            <select
                value={value}
                onChange={(e) => onFieldChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1.5 text-xs text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            >
                {options.map((opt: any) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 animate-fadeIn space-y-4">
                <h3 className="text-sm font-medium text-purple-400 mb-2">🎨 涂鸦轰炸定制 (Doodle Customization)</h3>

                {/* Background Selector */}
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">背景风格 (Background)</label>
                    <div className="grid grid-cols-2 gap-2">
                        {DOODLE_BACKGROUNDS.map((bg) => (
                            <button
                                key={bg.id}
                                onClick={() => onChange({ ...params, background: bg.id })}
                                className={`p-2 rounded-lg text-xs transition-all ${params.background === bg.id
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    }`}
                            >
                                {bg.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sticker Style Selector */}
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">涂鸦贴纸风格 (Sticker Style)</label>
                    <div className="grid grid-cols-1 gap-2">
                        {DOODLE_STYLES.map((style) => (
                            <button
                                key={style.id}
                                onClick={() => onChange({ ...params, doodleStyle: style.id })}
                                className={`p-2 rounded-lg text-xs transition-all text-left ${params.doodleStyle === style.id
                                    ? 'bg-pink-600 text-white shadow-md'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    }`}
                            >
                                <span className="font-bold block">{style.label}</span>
                                <span className="text-[10px] opacity-80 truncate block">{style.prompt}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quick Character Adjustments */}
                <div className="grid grid-cols-2 gap-3">
                    <SelectField
                        label="表情 (Expression)"
                        value={params.expression}
                        options={EXPRESSION_OPTIONS}
                        onChange={(val: string) => onChange({ ...params, expression: val })}
                    />
                    <SelectField
                        label="姿势 (Pose)"
                        value={params.bodyPose}
                        options={BODY_POSE_OPTIONS}
                        onChange={(val: string) => onChange({ ...params, bodyPose: val })}
                    />
                    <SelectField
                        label="时间 (Time)"
                        value={params.timeOfDay}
                        options={TIME_OF_DAY_OPTIONS}
                        onChange={(val: string) => onChange({ ...params, timeOfDay: val })}
                    />
                </div>
            </div>
        </div>
    );
};
