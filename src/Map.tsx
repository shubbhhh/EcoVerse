import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // If map is already initialized, skip
    if (mapInstance.current) {
      return;
    }

    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
    mapInstance.current = map;

    // L.tileLayer(
    //   'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}.jpg',
    //   { attribution: '© Stadia Maps © OpenMapTiles © OpenStreetMap' }
    // ).addTo(map);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attribution: 'Tiles © Esri' }
    ).addTo(map);

    const labelsPane = map.createPane('labelsPane');
    labelsPane.style.zIndex = '650';
    labelsPane.style.pointerEvents = 'none';

    L.tileLayer(
      'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      { attribution: 'Labels © Esri', pane: 'labelsPane' }
    ).addTo(map);

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '680px' }}
    />
  );
};

export default MapComponent;
