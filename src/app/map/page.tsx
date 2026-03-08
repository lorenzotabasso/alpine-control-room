'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen flex items-center justify-center">Loading map...</div>,
});

export default function MapPage() {
  return <MapComponent />;
}
