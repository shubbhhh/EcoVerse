import type { ForestData, TreeCoverLossData, MapMarker } from '../types';

const INDIA_BOUNDS = {
  type: "Polygon",
  coordinates: [[
    [68.1766, 7.9655],
    [97.4026, 7.9655],
    [97.4026, 35.4940],
    [68.1766, 35.4940],
    [68.1766, 7.9655]
  ]]
};

export const fetchForestLossData = async (): Promise<ForestData> => {
  try {
    const yearlyData: TreeCoverLossData[] = [];
    const startYear = 2001;
    const endYear = 2023;

    for (let year = startYear; year <= endYear; year++) {
      const area = Math.floor(Math.random() * 200000) + 150000;
      yearlyData.push({
        year,
        area_ha: area,
        emissions: area * 0.5
      });
    }

    const totalLoss = yearlyData.reduce((sum, data) => sum + data.area_ha, 0);

    return {
      totalLoss,
      yearlyData,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching forest data:', error);
    throw error;
  }
};

export const getIndiaStats = () => {
  return {
    totalForestArea: 80000000,
    treeCoverLossSince2000: 2330000,
    primaryForestLoss: 414000,
    lossPercentage: 6
  };
};

export const getTopAffectedStates = () => {
  return [
    { name: 'Arunachal Pradesh', loss: 345000, percentage: 14.8 },
    { name: 'Mizoram', loss: 298000, percentage: 12.8 },
    { name: 'Nagaland', loss: 267000, percentage: 11.5 },
    { name: 'Manipur', loss: 189000, percentage: 8.1 },
    { name: 'Meghalaya', loss: 156000, percentage: 6.7 }
  ];
};

export const getForestMarkers = (): MapMarker[] => {
  return [
    {
      id: '1',
      name: 'Arunachal Pradesh Forest Zone',
      lat: 28.2180,
      lng: 94.7278,
      loss: 345000,
      treeCoverLoss: 78,
      primaryForestLoss: 62,
      severity: 'critical',
      drivers: ['Agricultural expansion', 'Infrastructure development', 'Logging'],
      description: 'Largest forest loss in India. Critical biodiversity hotspot under severe pressure from rapid development.',
      recentAlerts: 156,
      riskLevel: 92,
      projectedLoss2030: 185000,
      futurePrediction: [
        { year: 2025, predictedLoss: 142000, confidence: 85, scenario: 'pessimistic' },
        { year: 2027, predictedLoss: 162000, confidence: 78, scenario: 'pessimistic' },
        { year: 2030, predictedLoss: 185000, confidence: 72, scenario: 'pessimistic' }
      ]
    },
    {
      id: '2',
      name: 'Mizoram Highland Region',
      lat: 23.1645,
      lng: 92.9376,
      loss: 298000,
      treeCoverLoss: 65,
      primaryForestLoss: 48,
      severity: 'critical',
      drivers: ['Jhum cultivation', 'Agricultural expansion', 'Settlement'],
      description: 'Traditional shifting cultivation causing significant forest degradation across highland areas.',
      recentAlerts: 142,
      riskLevel: 88,
      projectedLoss2030: 168000,
      futurePrediction: [
        { year: 2025, predictedLoss: 128000, confidence: 82, scenario: 'pessimistic' },
        { year: 2027, predictedLoss: 146000, confidence: 76, scenario: 'moderate' },
        { year: 2030, predictedLoss: 168000, confidence: 70, scenario: 'moderate' }
      ]
    },
    {
      id: '3',
      name: 'Nagaland Forest Belt',
      lat: 26.1584,
      lng: 94.5624,
      loss: 267000,
      treeCoverLoss: 58,
      primaryForestLoss: 41,
      severity: 'high',
      drivers: ['Shifting cultivation', 'Infrastructure', 'Logging'],
      description: 'Rapid deforestation due to changing agricultural practices and road construction.',
      recentAlerts: 128,
      riskLevel: 84,
      projectedLoss2030: 145000,
      futurePrediction: [
        { year: 2025, predictedLoss: 115000, confidence: 80, scenario: 'moderate' },
        { year: 2027, predictedLoss: 128000, confidence: 74, scenario: 'moderate' },
        { year: 2030, predictedLoss: 145000, confidence: 68, scenario: 'moderate' }
      ]
    },
    {
      id: '4',
      name: 'Manipur Valley',
      lat: 24.6637,
      lng: 93.9063,
      loss: 189000,
      treeCoverLoss: 44,
      primaryForestLoss: 32,
      severity: 'high',
      drivers: ['Agricultural expansion', 'Urbanization', 'Mining'],
      description: 'Growing urban pressure and mining activities leading to significant habitat loss.',
      recentAlerts: 98,
      riskLevel: 76,
      projectedLoss2030: 98000,
      futurePrediction: [
        { year: 2025, predictedLoss: 78000, confidence: 79, scenario: 'moderate' },
        { year: 2027, predictedLoss: 87000, confidence: 72, scenario: 'moderate' },
        { year: 2030, predictedLoss: 98000, confidence: 66, scenario: 'optimistic' }
      ]
    },
    {
      id: '5',
      name: 'Meghalaya Plateau',
      lat: 25.4670,
      lng: 91.3662,
      loss: 156000,
      treeCoverLoss: 38,
      primaryForestLoss: 28,
      severity: 'high',
      drivers: ['Coal mining', 'Limestone quarrying', 'Agriculture'],
      description: 'Extensive mining activities causing severe forest degradation and soil erosion.',
      recentAlerts: 89,
      riskLevel: 81,
      projectedLoss2030: 89000,
      futurePrediction: [
        { year: 2025, predictedLoss: 72000, confidence: 77, scenario: 'moderate' },
        { year: 2027, predictedLoss: 80000, confidence: 70, scenario: 'moderate' },
        { year: 2030, predictedLoss: 89000, confidence: 64, scenario: 'optimistic' }
      ]
    },
    {
      id: '6',
      name: 'Western Ghats - Karnataka',
      lat: 14.5204,
      lng: 75.7224,
      loss: 128000,
      treeCoverLoss: 32,
      primaryForestLoss: 24,
      severity: 'moderate',
      drivers: ['Coffee plantations', 'Tourism', 'Infrastructure'],
      description: 'UNESCO World Heritage site facing plantation expansion and tourism development pressure.',
      recentAlerts: 67,
      riskLevel: 68,
      projectedLoss2030: 72000,
      futurePrediction: [
        { year: 2025, predictedLoss: 58000, confidence: 81, scenario: 'optimistic' },
        { year: 2027, predictedLoss: 64000, confidence: 75, scenario: 'optimistic' },
        { year: 2030, predictedLoss: 72000, confidence: 69, scenario: 'optimistic' }
      ]
    },
    {
      id: '7',
      name: 'Madhya Pradesh Central Forests',
      lat: 22.9734,
      lng: 78.6569,
      loss: 112000,
      treeCoverLoss: 28,
      primaryForestLoss: 18,
      severity: 'moderate',
      drivers: ['Agricultural expansion', 'Forest fires', 'Development'],
      description: 'Seasonal fires and agricultural encroachment affecting forest cover.',
      recentAlerts: 54,
      riskLevel: 67,
      projectedLoss2030: 70000,
      futurePrediction: [
        { year: 2025, predictedLoss: 58000, confidence: 72, scenario: 'moderate' },
        { year: 2027, predictedLoss: 63000, confidence: 66, scenario: 'moderate' },
        { year: 2030, predictedLoss: 70000, confidence: 60, scenario: 'moderate' }
      ]
    },
    {
      id: '8',
      name: 'Odisha Eastern Ghats',
      lat: 20.9517,
      lng: 85.0985,
      loss: 98000,
      treeCoverLoss: 24,
      primaryForestLoss: 16,
      severity: 'moderate',
      drivers: ['Mining', 'Industrial projects', 'Agriculture'],
      description: 'Industrial development impacting tribal forest areas.',
      recentAlerts: 48,
      riskLevel: 70,
      projectedLoss2030: 68000,
      futurePrediction: [
        { year: 2025, predictedLoss: 56000, confidence: 74, scenario: 'moderate' },
        { year: 2027, predictedLoss: 61000, confidence: 68, scenario: 'moderate' },
        { year: 2030, predictedLoss: 68000, confidence: 62, scenario: 'moderate' }
      ]
    },
    {
      id: '9',
      name: 'Assam Brahmaputra Basin',
      lat: 26.2006,
      lng: 92.9376,
      loss: 87000,
      treeCoverLoss: 21,
      primaryForestLoss: 14,
      severity: 'moderate',
      drivers: ['Tea plantations', 'Flooding', 'Settlement'],
      description: 'Tea estates and flood damage reducing forest coverage.',
      recentAlerts: 41,
      riskLevel: 63,
      projectedLoss2030: 60000,
      futurePrediction: [
        { year: 2025, predictedLoss: 50000, confidence: 76, scenario: 'moderate' },
        { year: 2027, predictedLoss: 54000, confidence: 70, scenario: 'optimistic' },
        { year: 2030, predictedLoss: 60000, confidence: 64, scenario: 'optimistic' }
      ]
    },
    {
      id: '10',
      name: 'Chhattisgarh Sal Forests',
      lat: 21.2787,
      lng: 81.8661,
      loss: 76000,
      treeCoverLoss: 18,
      primaryForestLoss: 12,
      severity: 'low',
      drivers: ['Mining', 'Agriculture', 'Forest fires'],
      description: 'Rich sal forests under pressure from mining activities.',
      recentAlerts: 36,
      riskLevel: 61,
      projectedLoss2030: 56000,
      futurePrediction: [
        { year: 2025, predictedLoss: 46000, confidence: 71, scenario: 'moderate' },
        { year: 2027, predictedLoss: 50000, confidence: 65, scenario: 'optimistic' },
        { year: 2030, predictedLoss: 56000, confidence: 59, scenario: 'optimistic' }
      ]
    },
    {
      id: '11',
      name: 'Kerala Western Ghats',
      lat: 10.8505,
      lng: 76.2711,
      loss: 64000,
      treeCoverLoss: 16,
      primaryForestLoss: 11,
      severity: 'low',
      drivers: ['Plantations', 'Landslides', 'Tourism'],
      description: 'Spice plantations and monsoon damage affecting forests.',
      recentAlerts: 28,
      riskLevel: 62,
      projectedLoss2030: 58000,
      futurePrediction: [
        { year: 2025, predictedLoss: 48000, confidence: 79, scenario: 'optimistic' },
        { year: 2027, predictedLoss: 52000, confidence: 73, scenario: 'optimistic' },
        { year: 2030, predictedLoss: 58000, confidence: 67, scenario: 'optimistic' }
      ]
    },
    {
      id: '12',
      name: 'Uttarakhand Himalayan Region',
      lat: 30.0668,
      lng: 79.0193,
      loss: 52000,
      treeCoverLoss: 14,
      primaryForestLoss: 9,
      severity: 'low',
      drivers: ['Tourism', 'Infrastructure', 'Forest fires'],
      description: 'Tourism development and climate change impacting mountain forests.',
      recentAlerts: 23,
      riskLevel: 55,
      projectedLoss2030: 40000,
      futurePrediction: [
        { year: 2025, predictedLoss: 33000, confidence: 79, scenario: 'optimistic' },
        { year: 2027, predictedLoss: 36000, confidence: 73, scenario: 'optimistic' },
        { year: 2030, predictedLoss: 40000, confidence: 67, scenario: 'optimistic' }
      ]
    }
  ];
};
