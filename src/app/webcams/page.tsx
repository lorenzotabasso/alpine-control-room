"use client";

import { webcams } from "@/lib/data";
import { ContentType, WebcamProps } from "@/lib/definitions";
import Image from "next/image";

function checkWebcamSource(source: WebcamProps): string {
  if (source.contentType === ContentType.IMG) {
    return source.link;
  } else {
    return source.thumbnailLink
      ? source.thumbnailLink
      : "./thumbnailNotAvailable.svg";
  }
}

function composeWebcamRegion(webcam: WebcamProps): string {
  const nationFlag =
    webcam.nation?.trim().toLowerCase() === "ita" ? "🇮🇹" : "🇫🇷";
  const subRegion = webcam.subRegion ? `, ${webcam.subRegion}` : "";
  return `${nationFlag} ${webcam.region}${subRegion}`;
}

function openNewTabWithSelectedWebcam(url: string | undefined): void {
  if (url) {
    window.open(url);
  }
}

export default function Page() {
  const allWebcams = webcams.map((webcam) => {
    const isUnoptimized = webcam.thumbnailLink?.includes("wtvpict.feratel.com"); // Example condition

    return (
      <div
        className="border border-gray-400 rounded-xl overflow-hidden"
        key={webcam.resort + "-" + webcam.label}
      >
        <Image
          src={checkWebcamSource(webcam)}
          alt={webcam.label}
          width={373}
          height={210}
          {...(isUnoptimized ? { unoptimized: true } : {})} // Conditionally apply unoptimized
        />
        <div className="p-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{webcam.resort}</h3>
            {webcam.contentType === ContentType.IFRAME && (
              <div className="flex justify-between items-center text-red-600">
                <h5 className="text-sm font-normal mr-1">Live</h5>
                <Image
                  src="./stream.svg"
                  alt="This webcam is live"
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
          <h4 className="text-md font-semibold">
            {webcam.altitude
              ? webcam.label + ", " + webcam.altitude
              : webcam.label}
          </h4>
          <p className="text-sm font-normal">{composeWebcamRegion(webcam)}</p>
        </div>
        <div className="p-2 flex justify-evenly gap-2">
          {webcam.source && (
            <button
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full shadow-sm"
              onClick={() => openNewTabWithSelectedWebcam(webcam.source)}
            >
              Source
            </button>
          )}
          {webcam.link && (
            <button
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full shadow-sm"
              onClick={() => openNewTabWithSelectedWebcam(webcam.link)}
            >
              Open
            </button>
          )}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="m-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-center">
        {allWebcams}
      </div>
    </div>
  );
}
