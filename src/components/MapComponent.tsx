'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { webcams } from '@/lib/webcams';
import { MAP_CONFIG } from '@/lib/constants';

// Import marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for Leaflet marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView(
      MAP_CONFIG.DEFAULT_CENTER,
      MAP_CONFIG.DEFAULT_ZOOM
    );

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: MAP_CONFIG.MAX_ZOOM,
      minZoom: MAP_CONFIG.MIN_ZOOM,
    }).addTo(map.current);

    // Add markers
    webcams.forEach((webcam) => {
      if (!webcam.coordinates || !map.current) return;

      let popupLabel = `<b>${webcam.resort} - ${webcam.label}</b>`;
      if (webcam.altitude) {
        popupLabel += `<br><p>${webcam.altitude}</p>`;
      }
      if (webcam.resortGroup) {
        popupLabel = `<b>${webcam.resortGroup}</b><br>${popupLabel}`;
      }
      popupLabel += `<br><a href="${webcam.link}" target="_blank" class="text-cyan-500 hover:underline">Open webcam</a>`;

      L.marker([
        webcam.coordinates.latitude,
        webcam.coordinates.longitude,
      ])
        .bindPopup(popupLabel)
        .addTo(map.current);
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      className="h-screen w-screen"
      role="region"
      aria-label="Interactive map of Alpine webcams"
    />
  );
}
