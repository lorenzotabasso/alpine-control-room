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
    return (
      <div key={webcam.resort + "-" + webcam.label}>
        <div>
          <Image
            src={checkWebcamSource(webcam)}
            alt={webcam.label}
            width={373}
            height={210}
          />
        </div>
        <div>
          <h3>{webcam.resort}</h3>
          <h4>
            {webcam.altitude
              ? webcam.label + ", " + webcam.altitude
              : webcam.label}
          </h4>
          <p>{composeWebcamRegion(webcam)}</p>
        </div>
        <div>
          {webcam.source && (
            <button onClick={() => openNewTabWithSelectedWebcam(webcam.source)}>
              Source
            </button>
          )}
          {webcam.link && (
            <button onClick={() => openNewTabWithSelectedWebcam(webcam.link)}>
              Open
            </button>
          )}
        </div>
      </div>
    );
  });

  return <div>{allWebcams}</div>;
}
