"use client";

import { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const allWebcams = webcams.map((webcam) => {
    return (
      <div
        className="border border-gray-400 rounded-xl overflow-hidden"
        key={webcam.resort + "-" + webcam.label}
      >
        <div className="group cursor-pointer relative">
          <Image
            src={checkWebcamSource(webcam)}
            alt={webcam.label}
            width={373}
            height={210}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="bg-white px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => openModal(checkWebcamSource(webcam))} // Open modal on button click
            >
              <Image
                src="./fullscreen.svg"
                alt="Open webcam in fullscreen"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div className="p-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{webcam.resort}</h3>
            {webcam.contentType === ContentType.IFRAME && (
              <div className="flex justify-between items-center text-red-600">
                <h5 className="text-sm font-normal mr-2">Live</h5>
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
      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Selected Webcam"
              width={800}
              height={450}
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Webcam Cards */}
      <div className="m-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-center">
        {allWebcams}
      </div>
    </div>
  );
}
