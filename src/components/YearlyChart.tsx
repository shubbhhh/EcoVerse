import React from 'react';
import type { TreeCoverLossData } from '../types';

interface YearlyChartProps {
  data: TreeCoverLossData[];
}

export const YearlyChart: React.FC<YearlyChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.area_ha));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Tree Cover Loss by Year (2001-2023)</h3>
      <div className="space-y-1">
        {data.map((item) => (
          <div key={item.year} className="flex items-center gap-3 group">
            <div className="w-12 text-sm font-medium text-slate-600 text-right">
              {item.year}
            </div>
            <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500 rounded-lg flex items-center justify-end pr-2"
                style={{ width: `${(item.area_ha / maxValue) * 100}%` }}
              >
                <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {(item.area_ha / 1000).toFixed(1)}k ha
                </span>
              </div>
            </div>
            <div className="w-24 text-sm text-slate-700 font-medium">
              {(item.area_ha / 1000).toFixed(1)}k ha
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          <span className="font-semibold">Total Loss:</span> {(data.reduce((sum, d) => sum + d.area_ha, 0) / 1000000).toFixed(2)} million hectares
        </p>
      </div>
    </div>
  );
};
