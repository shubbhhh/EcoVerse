import React from 'react';
import type { MapMarker } from '../types';
import {
  AlertTriangle,
  TrendingDown,
  Flame,
  X,
  MapPin,
  Activity,
  Trees,
  TrendingUp,
  Brain,
  Calendar
} from 'lucide-react';

interface SidePanelProps {
  marker: MapMarker | null;
  onClose: () => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({ marker, onClose }) => {
  if (!marker) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center h-full border border-slate-200">
        <MapPin className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-slate-500 text-center">
          Select a marker on the map to view detailed information
        </p>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'moderate': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-lime-600 bg-lime-50 border-lime-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getScenarioColor = (scenario: string) => {
    switch (scenario) {
      case 'optimistic': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'pessimistic': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'text-red-600';
    if (risk >= 60) return 'text-orange-600';
    if (risk >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg h-full border border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-2xl font-bold text-slate-800 pr-8">{marker.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close panel"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 font-semibold text-sm uppercase ${getSeverityColor(marker.severity)}`}>
          <AlertTriangle className="w-4 h-4" />
          {marker.severity}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <p className="text-slate-700 leading-relaxed">{marker.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border-2 border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-700" />
              <span className="text-xs font-medium text-red-700 uppercase">Total Loss</span>
            </div>
            <p className="text-2xl font-bold text-red-900">{(marker.loss / 1000).toFixed(1)}k</p>
            <p className="text-xs text-red-700 mt-1">hectares</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border-2 border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-700" />
              <span className="text-xs font-medium text-orange-700 uppercase">Alerts</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">{marker.recentAlerts}</p>
            <p className="text-xs text-orange-700 mt-1">this month</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border-2 border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Trees className="w-5 h-5 text-amber-700" />
              <span className="text-xs font-medium text-amber-700 uppercase">Tree Cover</span>
            </div>
            <p className="text-2xl font-bold text-amber-900">{marker.treeCoverLoss}%</p>
            <p className="text-xs text-amber-700 mt-1">loss rate</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border-2 border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-emerald-700" />
              <span className="text-xs font-medium text-emerald-700 uppercase">Primary</span>
            </div>
            <p className="text-2xl font-bold text-emerald-900">{marker.primaryForestLoss}%</p>
            <p className="text-xs text-emerald-700 mt-1">forest loss</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">AI-Powered Future Predictions</h3>
              <p className="text-xs text-slate-600">ML model forecasts (simulated)</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 mb-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-5 h-5 ${getRiskColor(marker.riskLevel)}`} />
                <span className="text-sm font-semibold text-slate-700">Risk Level</span>
              </div>
              <span className={`text-2xl font-bold ${getRiskColor(marker.riskLevel)}`}>
                {marker.riskLevel}%
              </span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  marker.riskLevel >= 80
                    ? 'bg-red-500'
                    : marker.riskLevel >= 60
                    ? 'bg-orange-500'
                    : marker.riskLevel >= 40
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${marker.riskLevel}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Calendar className="w-4 h-4" />
              Projected Loss Timeline
            </div>
            {marker.futurePrediction.map((prediction, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-800">{prediction.year}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold uppercase ${getScenarioColor(prediction.scenario)}`}>
                      {prediction.scenario}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-red-600">
                      {(prediction.predictedLoss / 1000).toFixed(1)}k ha
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600">{prediction.confidence}% confidence</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-semibold text-slate-700 uppercase">2030 Projection</span>
            </div>
            <p className="text-xl font-bold text-blue-900">
              {(marker.projectedLoss2030 / 1000).toFixed(1)}k hectares
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Estimated cumulative loss by 2030 if current trends continue
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Primary Drivers
          </h3>
          <div className="space-y-2">
            {marker.drivers.map((driver, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></div>
                <span className="text-sm font-medium text-slate-700">{driver}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2 text-sm">Location</h4>
          <p className="text-xs text-blue-800">
            <span className="font-medium">Coordinates:</span> {marker.lat.toFixed(4)}°N, {marker.lng.toFixed(4)}°E
          </p>
        </div>
      </div>
    </div>
  );
};
