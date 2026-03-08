import { type Webcam } from '@/lib/models';
import Image from 'next/image';
import {
  getImageUrl,
  formatLocationInfo,
  openUrl,
} from '@/lib/utils';

export function WebcamCard(props: Webcam) {
  const { resort, label, altitude, source, link } = props;
  const imageUrl = getImageUrl(props);
  const locationInfo = formatLocationInfo(
    props.nation,
    props.region,
    props.subRegion
  );

  return (
    <div className="flex w-full flex-col rounded-lg border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white">
      {/* Image Container */}
      <div className="relative h-72 w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${resort} - ${label}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-200"
            sizes="320px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-16 w-16 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{resort}</h3>
          <p className="mt-1 font-semibold text-slate-700">
            {altitude ? `${label}, ${altitude}` : label}
          </p>
          <p className="mt-2 text-sm text-slate-600">{locationInfo}</p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {source && (
            <button
              onClick={() => openUrl(source)}
              className="flex-1 rounded-full border-2 border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-600 hover:bg-cyan-50 transition-colors"
            >
              Source
            </button>
          )}
          <button
            onClick={() => openUrl(link)}
            className={`flex-1 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600 transition-colors ${
              !source ? 'col-span-2' : ''
            }`}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
