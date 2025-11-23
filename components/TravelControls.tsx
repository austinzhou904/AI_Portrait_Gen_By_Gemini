import React from 'react';
import { TravelParams } from '../types';
import { COUNTRIES, SEASONS, FESTIVALS, TIMES_OF_DAY } from '../constants/travelOptions';

interface TravelControlsProps {
    travelParams: TravelParams;
    onChange: (params: TravelParams) => void;
}

export const TravelControls: React.FC<TravelControlsProps> = ({
    travelParams,
    onChange,
}) => {
    const handleChange = (key: keyof TravelParams, value: string) => {
        onChange({ ...travelParams, [key]: value });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Country Selection */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    1. Select Destination (Country/Region)
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {COUNTRIES.map((country) => (
                        <button
                            key={country.id}
                            onClick={() => handleChange('country', country.id)}
                            className={`p-3 rounded-lg border text-left transition-all ${travelParams.country === country.id
                                ? 'bg-brand-600 border-brand-500 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                }`}
                        >
                            <div className="font-medium text-sm">{country.name}</div>
                        </button>
                    ))}
                </div>
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

            {/* Festival Selection */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    5. Select Festival (Optional)
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
        </div>
    );
};
