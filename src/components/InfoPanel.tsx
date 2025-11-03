import React from 'react';
import { Info, ExternalLink } from 'lucide-react';

export const InfoPanel: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Info className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">About This Data</h3>
          <p className="text-sm text-slate-600 mt-1">Understanding deforestation in India</p>
        </div>
      </div>

      <div className="space-y-4 text-sm text-slate-700">
        <div>
          <h4 className="font-semibold text-slate-800 mb-1">Data Coverage</h4>
          <p>Tree cover loss data from 2001 to 2023, measured in hectares. Data includes both natural forests and tree plantations.</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-800 mb-1">Key Findings</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>2.33 million hectares lost since 2000</li>
            <li>6% decrease in total tree cover</li>
            <li>414,000 hectares of primary forest lost</li>
            <li>Northeast states most affected</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-800 mb-1">Main Drivers</h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Agricultural expansion</li>
            <li>Infrastructure development</li>
            <li>Commercial logging</li>
            <li>Forest fires</li>
          </ul>
        </div>

        <a
          href="https://www.globalforestwatch.org/map/country/IND"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          View on Global Forest Watch
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
