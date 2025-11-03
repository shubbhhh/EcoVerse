import { useEffect, useState } from 'react';
import { TreePine, TrendingDown, Leaf, BarChart3, Map } from 'lucide-react';
import { Header } from './components/Hearder';
import { StatCard } from './components/StatCard';
import { YearlyChart } from './components/YearlyChart';
import { StateRankings } from './components/StateRankings';
// import { InfoPanel } from './components/InfoPanel';
import { MapView } from './components/MapView';
import { SidePanel } from './components/SidePanel';
import { fetchForestLossData, getIndiaStats, getTopAffectedStates, getForestMarkers } from './services/forestService';
import type { ForestData, MapMarker } from './types';

function App() {
  const [forestData, setForestData] = useState<ForestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const indiaStats = getIndiaStats();
  const topStates = getTopAffectedStates();
  const markers = getForestMarkers();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchForestLossData();
        setForestData(data);
      } catch (error) {
        console.error('Failed to load forest data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <TreePine className="w-16 h-16 text-emerald-600 animate-pulse mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading forest data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Forest Area"
            value={`${(indiaStats.totalForestArea / 1000000).toFixed(1)}M ha`}
            subtitle="Current coverage"
            icon={TreePine}
            color="emerald"
          />
          <StatCard
            title="Tree Cover Loss"
            value={`${(indiaStats.treeCoverLossSince2000 / 1000000).toFixed(2)}M ha`}
            subtitle="Since 2000"
            icon={TrendingDown}
            trend="down"
            color="red"
          />
          <StatCard
            title="Primary Forest Loss"
            value={`${(indiaStats.primaryForestLoss / 1000).toFixed(0)}k ha`}
            subtitle="2002-2023"
            icon={Leaf}
            color="amber"
          />
          <StatCard
            title="Loss Percentage"
            value={`${indiaStats.lossPercentage}%`}
            subtitle="Total decrease"
            icon={BarChart3}
            color="red"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Map className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Interactive Deforestation Map</h2>
              <p className="text-sm text-slate-600">Click on markers to view detailed information</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[600px]">
              <MapView
                markers={markers}
                onMarkerClick={setSelectedMarker}
                selectedMarkerId={selectedMarker?.id || null}
              />
            </div>
            <div className="h-[600px]">
              <SidePanel
                marker={selectedMarker}
                onClose={() => setSelectedMarker(null)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {forestData && <YearlyChart data={forestData.yearlyData} />}
          </div>
          <div className="space-y-6">
            <StateRankings states={topStates} />
          </div>
        </div>

        {/* <InfoPanel /> */}

        <footer className="text-center py-6 text-sm text-slate-600">
          <p>
            Data powered by{' '}
            <a
              href="https://www.globalforestwatch.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-medium underline"
            >
              Global Forest Watch
            </a>
          </p>
          <p className="mt-2">Last updated: {forestData ? new Date(forestData.lastUpdated).toLocaleDateString() : 'N/A'}</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
