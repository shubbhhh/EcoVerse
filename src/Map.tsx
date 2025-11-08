import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  // useEffect(() => {});

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


// { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjY3NDFhZjEzMzMwZTYzZGE1MjY1YiIsInJvbGUiOiJVU0VSIiwicHJvdmlkZXIiOiJnb29nbGUiLCJlbWFpbCI6InNodWJoYW12eTA3QGdtYWlsLmNvbSIsImV4dHJhVXNlckRhdGEiOnsiYXBwcyI6WyJnZnciXX0sImNyZWF0ZWRBdCI6MTc2MTAyMTE5ODcwMCwibmFtZSI6IlNodWJoYW0gWWFkYXYiLCJpYXQiOjE3NjEwMjExOTh9.O4M_n9OzYsk8XugdtQs0lN2xtlpF4aTPM-PEXeQxmzE"}
/*
{
    "data": {
        "type": "applications",
        "id": "68f7110f07e14a0f2dedf058",
        "attributes": {
            "name": "EcoVerse",
            "organization": null,
            "user": {
                "id": "68f6741af13330e63da5265b",
                "name": "Shubham Yadav"
            },
            "apiKeyValue": "dMdHfeX7d51tupZXkcK3xaDgAYUjDMR6aGlYQj3K",
            "createdAt": "2025-10-21T04:50:23.797Z",
            "updatedAt": "2025-10-21T04:50:23.797Z"
        }
    }
}
*/