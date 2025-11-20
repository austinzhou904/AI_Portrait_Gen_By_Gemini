import React from 'react';
import { PRESETS } from '../constants';
import { PresetScenario } from '../types';

interface PresetSelectorProps {
  selectedPresetId: string | null;
  onSelect: (preset: PresetScenario) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ selectedPresetId, onSelect }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        2. Choose Style (Optional)
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset)}
            className={`relative group overflow-hidden rounded-lg border-2 transition-all duration-200 text-left
              ${selectedPresetId === preset.id 
                ? 'border-brand-500 ring-2 ring-brand-500/50' 
                : 'border-transparent hover:border-slate-500'}
            `}
          >
            <div className="aspect-square w-full overflow-hidden">
              <img 
                src={preset.thumbnailUrl} 
                alt={preset.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300
                ${selectedPresetId === preset.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'}
              `} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="text-white text-xs font-bold truncate">{preset.name}</p>
              <p className="text-slate-300 text-[10px] truncate opacity-0 group-hover:opacity-100 transition-opacity">
                {preset.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};