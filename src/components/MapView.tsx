import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarker } from '../types';

interface MapViewProps {
  markers: MapMarker[];
  onMarkerClick: (marker: MapMarker) => void;
  selectedMarkerId: string | null;
}

const getMarkerColor = (severity: string): string => {
  switch (severity) {
    case 'critical': return '#dc2626';
    case 'high': return '#ea580c';
    case 'moderate': return '#f59e0b';
    case 'low': return '#84cc16';
    default: return '#6b7280';
  }
};

const getMarkerSize = (severity: string): number => {
  switch (severity) {
    case 'critical': return 16;
    case 'high': return 14;
    case 'moderate': return 12;
    case 'low': return 10;
    default: return 10;
  }
};

export const MapView: React.FC<MapViewProps> = ({ markers, onMarkerClick, selectedMarkerId }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    markers.forEach((marker) => {
      const isSelected = marker.id === selectedMarkerId;
      const color = getMarkerColor(marker.severity);
      const size = getMarkerSize(marker.severity);

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: ${isSelected ? size + 8 : size}px;
            height: ${isSelected ? size + 8 : size}px;
            background-color: ${color};
            border: ${isSelected ? '3px' : '2px'} solid white;
            border-radius: 50%;
            box-shadow: 0 ${isSelected ? '4px 12px' : '2px 6px'} rgba(0,0,0,0.3);
            transition: all 0.2s ease;
            cursor: pointer;
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
          "></div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const leafletMarker = L.marker([marker.lat, marker.lng], { icon })
        .addTo(markersLayerRef.current!);

      leafletMarker.on('click', () => {
        onMarkerClick(marker);
      });

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1f2937;">${marker.name}</h3>
          <div style="font-size: 12px; color: #4b5563;">
            <p style="margin: 4px 0;"><strong>Loss:</strong> ${(marker.loss / 1000).toFixed(1)}k ha</p>
            <p style="margin: 4px 0;"><strong>Severity:</strong> <span style="color: ${color}; text-transform: uppercase; font-weight: 600;">${marker.severity}</span></p>
            <p style="margin: 4px 0;"><strong>Alerts:</strong> ${marker.recentAlerts}</p>
          </div>
        </div>
      `;

      leafletMarker.bindPopup(popupContent);
    });
  }, [markers, onMarkerClick, selectedMarkerId]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full rounded-xl shadow-lg" />
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="text-xs font-semibold text-slate-700 mb-2">Severity Levels</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-xs text-slate-600">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-600"></div>
            <span className="text-xs text-slate-600">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-slate-600">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-lime-500"></div>
            <span className="text-xs text-slate-600">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};
