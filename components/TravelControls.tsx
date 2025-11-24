import React, { useState } from 'react';
import { TravelParams } from '../types';
import { COUNTRIES, SEASONS, FESTIVALS, TIMES_OF_DAY, CAMERA_POSITIONS, LENS_TYPES, PITCH_ANGLES, SHOT_TYPES } from '../constants/travelOptions';

interface TravelControlsProps {
    travelParams: TravelParams;
    onChange: (params: TravelParams) => void;
}

export const TravelControls: React.FC<TravelControlsProps> = ({
    travelParams,
    onChange,
}) => {
    const [activeTab, setActiveTab] = useState<'photo' | 'plan'>('photo');

    const handleChange = (key: keyof TravelParams, value: string) => {
        onChange({ ...travelParams, [key]: value });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Tab Switcher */}
            <div className="flex p-1 bg-slate-800/50 rounded-lg">
                <button
                    onClick={() => setActiveTab('photo')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'photo'
                            ? 'bg-brand-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    📸 旅行照生成
                </button>
                <button
                    onClick={() => setActiveTab('plan')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'plan'
                            ? 'bg-brand-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    🗺️ 行程规划
                </button>
            </div>

            {activeTab === 'plan' ? (
                <div className="space-y-4 animate-fadeIn">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-sm text-blue-200">
                        <h3 className="font-bold mb-2 flex items-center">
                            <span className="mr-2">🤖</span> 智能行程规划
                        </h3>
                        <p>告诉我你想去哪里，我为你规划完美的行程！</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            目的地 (Destination)
                        </label>
                        <input
                            type="text"
                            value={travelParams.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            placeholder="例如：罗马、京都、巴黎..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            旅行偏好 (Preferences)
                        </label>
                        <textarea
                            value={travelParams.landmark || ''} // Reusing landmark field for preferences in plan mode
                            onChange={(e) => handleChange('landmark', e.target.value)}
                            placeholder="例如：我是艺术爱好者，喜欢安静的景点，请推荐当地美食..."
                            rows={4}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                    </div>

                    <div className="text-xs text-slate-500 mt-2">
                        * 点击下方 "Start Travel" 生成详细行程单
                    </div>
                </div>
            ) : (
                <>
                    {/* Country Selection - Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            1. Select Destination
                        </label>
                        <select
                            value={travelParams.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        >
                            {COUNTRIES.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Landmark Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            2. Specific Landmark (Optional)
                        </label>
                        <input
                            type="text"
                            value={travelParams.landmark}
                            onChange={(e) => handleChange('landmark', e.target.value)}
                            placeholder="e.g., Eiffel Tower, Great Wall, Mount Fuji"
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                    </div>

                    {/* Season Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            3. Select Season
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {SEASONS.map((season) => (
                                <button
                                    key={season.id}
                                    onClick={() => handleChange('season', season.id)}
                                    className={`p-3 rounded-lg border text-left transition-all ${travelParams.season === season.id
                                        ? 'bg-brand-600 border-brand-500 text-white'
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{season.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time of Day Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            4. Select Time of Day
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {TIMES_OF_DAY.map((time) => (
                                <button
                                    key={time.id}
                                    onClick={() => handleChange('timeOfDay', time.id)}
                                    className={`p-3 rounded-lg border text-left transition-all ${travelParams.timeOfDay === time.id
                                        ? 'bg-brand-600 border-brand-500 text-white'
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{time.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Shot Type */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            5. Shot Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {SHOT_TYPES.map((shot) => (
                                <button
                                    key={shot.id}
                                    onClick={() => handleChange('shotType', shot.id)}
                                    className={`p-3 rounded-lg border text-left transition-all ${travelParams.shotType === shot.id
                                        ? 'bg-brand-600 border-brand-500 text-white'
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{shot.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Camera Position */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            6. Camera Position
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {CAMERA_POSITIONS.map((position) => (
                                <button
                                    key={position.id}
                                    onClick={() => handleChange('cameraPosition', position.id)}
                                    className={`p-3 rounded-lg border text-left transition-all ${travelParams.cameraPosition === position.id
                                        ? 'bg-brand-600 border-brand-500 text-white'
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{position.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lens Type */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            7. Lens Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {LENS_TYPES.map((lens) => (
                                <button
                                    key={lens.id}
                                    onClick={() => handleChange('lens', lens.id)}
                                    className={`p-3 rounded-lg border text-left transition-all ${travelParams.lens === lens.id
                                        ? 'bg-brand-600 border-brand-500 text-white'
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{lens.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pitch Angle */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            8. Pitch Angle
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {PITCH_ANGLES.map((angle) => (
                                <button
                                    key={angle.id}
                                    onClick={() => handleChange('pitchAngle', angle.id)}
                                    className={`p-3 rounded-lg border text-left transition-all ${travelParams.pitchAngle === angle.id
                                        ? 'bg-brand-600 border-brand-500 text-white'
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{angle.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Festival Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            9. Select Festival (Optional)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {FESTIVALS.map((festival) => (
                                <button
                                    key={festival.id}
                                    onClick={() => handleChange('festival', festival.id)}
                                    className={`p-3 rounded-lg border text-left transition-all ${travelParams.festival === festival.id
                                        ? 'bg-brand-600 border-brand-500 text-white'
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="font-medium text-sm">{festival.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
