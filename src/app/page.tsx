'use client';

import { useState, useMemo } from 'react';
import { webcams } from '@/lib/webcams';
import { filterWebcams } from '@/lib/utils';
import { WebcamCard } from '@/components/WebcamCard';

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredWebcams = useMemo(
    () => filterWebcams(webcams, search),
    [search]
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-slate-900">
            Alpine Webcams
          </h1>
          <p className="text-lg text-slate-600">
            Monitor ski resorts across the Alps in real-time
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by resort, region, or country..."
              className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base text-slate-900 placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center text-sm text-slate-600">
          Showing {filteredWebcams.length} of {webcams.length} webcams
        </div>

        {/* Webcam Grid */}
        {filteredWebcams.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {filteredWebcams.map((webcam) => (
              <div key={`${webcam.resort}-${webcam.label}`} className="w-full">
                <WebcamCard {...webcam} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-16 w-16 text-gray-300 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg text-slate-600">
              No webcams found matching &quot;{search}&quot;
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
