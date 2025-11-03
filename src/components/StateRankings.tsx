import React from 'react';
import { MapPin } from 'lucide-react';
import type { RegionData } from '../types';

interface StateRankingsProps {
  states: RegionData[];
}

export const StateRankings: React.FC<StateRankingsProps> = ({ states }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-red-600" />
        Top Affected States
      </h3>
      <div className="space-y-4">
        {states.map((state, index) => (
          <div key={state.name} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm">
                  {index + 1}
                </div>
                <span className="font-semibold text-slate-800 group-hover:text-red-600 transition-colors">
                  {state.name}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-800">
                  {(state.loss / 1000).toFixed(0)}k ha
                </div>
                <div className="text-xs text-slate-500">
                  {state.percentage}%
                </div>
              </div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
                style={{ width: `${state.percentage * 6}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
