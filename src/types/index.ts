export interface TreeCoverLossData {
  year: number;
  area_ha: number;
  emissions?: number;
}

export interface ForestData {
  totalLoss: number;
  yearlyData: TreeCoverLossData[];
  lastUpdated: string;
}

export interface RegionData {
  name: string;
  loss: number;
  percentage: number;
}

export interface FuturePrediction {
  year: number;
  predictedLoss: number;
  confidence: number;
  scenario: 'optimistic' | 'moderate' | 'pessimistic';
}

export interface MapMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  loss: number;
  treeCoverLoss: number;
  primaryForestLoss: number;
  severity: 'critical' | 'high' | 'moderate' | 'low';
  drivers: string[];
  description: string;
  recentAlerts: number;
  futurePrediction: FuturePrediction[];
  riskLevel: number;
  projectedLoss2030: number;
}
