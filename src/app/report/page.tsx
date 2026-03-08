'use client';

import { REPORTS } from '@/lib/constants';
import { openUrl } from '@/lib/utils';

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-slate-900">
            Weather & Reports
          </h1>
          <p className="text-lg text-slate-600">
            Get the latest snow reports and weather forecasts
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {REPORTS.map(({ id, title, image, url, borderColor, hoverColor }) => (
            <button
              key={id}
              onClick={() => openUrl(url)}
              className={`flex flex-col items-center rounded-lg border-2 ${borderColor} p-4 shadow-sm transition-all hover:shadow-md ${hoverColor}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={title}
                className="mb-4 h-32 w-32 object-contain"
              />
              <p className="text-center font-semibold text-slate-900 text-sm">
                {title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
