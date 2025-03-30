"use client";

import { webcams } from "@/lib/data";
import { ContentType, WebcamProps } from "@/lib/definitions";
import { Button, Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
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

function openNewTabWithSelectedWebcam(
  url: string | undefined,
  isModal?: boolean
): void {
  if (url) {
    window.open(url);
  }
  if (isModal) {
    // Close the modal if applicable
    // This is a placeholder, implement your modal close logic here
  }
}

export default function Page() {
  const allWebcams = webcams.map((webcam) => {
    return (
      <div
        className="border border-gray-400 rounded-xl overflow-hidden"
        key={webcam.resort + "-" + webcam.label}
      >
        <div>
          <Image
            style={{ height: "224px", objectFit: "cover" }}
            src={checkWebcamSource(webcam)}
            alt={webcam.label}
            width={398}
            height={224}
            unoptimized={webcam.thumbnailUnoptimized}
          />
        </div>
        <div className="p-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{webcam.resort}</h3>
            {webcam.contentType === ContentType.IMG && (
              <div className="flex justify-between items-center text-blue-600">
                <h5 className="text-sm font-normal mr-1">Static</h5>
                <Image
                  src="./photoCamera.svg"
                  alt="This webcam updates after few minutes"
                  width={24}
                  height={24}
                />
              </div>
            )}
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
            <Button
              className="rounded-full shadow-sm bg-emerald-600 data-[hover]:bg-emerald-500 data-[active]:bg-emerald-700 py-2 px-4 text-sm text-white"
              onClick={() => openNewTabWithSelectedWebcam(webcam.source)}
            >
              Source
            </Button>
          )}
          {webcam.link && (
            <Button
              className="rounded-full shadow-sm bg-sky-600 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 py-2 px-4 text-sm text-white"
              onClick={() => openNewTabWithSelectedWebcam(webcam.link, true)}
            >
              Open
            </Button>
          )}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="w-full max-w-md px-4 flex justify-center items-center">
        <Input
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        />
      </div>
      <div className="m-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-center">
        {allWebcams}
      </div>
    </div>
  );
}
