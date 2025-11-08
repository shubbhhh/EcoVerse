import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'emerald'
}) => {
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  return (
    <div className={`rounded-xl border-2 p-6 transition-all hover:shadow-lg ${colorClasses[color as keyof typeof colorClasses] || colorClasses.emerald}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-80 mb-1">{title}</p>
          <p className="text-3xl font-bold mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm opacity-70">{subtitle}</p>
          )}
        </div>
        <div className="ml-4">
          <Icon className="w-8 h-8 opacity-60" />
        </div>
      </div>
      {trend && (
        <div className={`mt-3 text-xs font-medium ${trend === 'down' ? 'text-red-600' : 'text-emerald-600'}`}>
          {trend === 'down' ? '↓' : '↑'} Trend: {trend === 'down' ? 'Decreasing' : 'Increasing'}
        </div>
      )}
    </div>
  );
};
