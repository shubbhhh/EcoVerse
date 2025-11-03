import React from 'react';
import { TreePine } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
              <TreePine className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">India Deforestation Dashboard</h1>
              <p className="text-emerald-100 mt-1">Real-time forest monitoring powered by Global Forest Watch</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
