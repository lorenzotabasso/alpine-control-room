"use client";

import { useEffect, useState } from "react";
import { webcams } from "@/lib/data";
import { ContentType, WebcamProps } from "@/lib/definitions";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input
} from "@headlessui/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

function checkWebcamSource(source: WebcamProps): string {
  if (source.contentType === "img") {
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

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect if the device is desktop
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Desktop if width >= 1024px
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  const openDialog = (src: string, alt: string) => {
    if (isDesktop) {
      setSelectedImage({ src, alt });
      setIsOpen(true);
    } else {
      console.log("Modal is disabled on mobile devices.");
    }
  };

  const closeDialog = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

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
            onClick={() =>
              openDialog(checkWebcamSource(webcam), webcam.label)
            } // Open dialog with selected image
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
              className="rounded shadow-md bg-emerald-500 data-[hover]:bg-emerald-600 data-[active]:bg-emerald-700 py-2 px-4 text-sm text-white transition duration-200"
              onClick={() => window.open(webcam.source)}
            >
              Source
            </Button>
          )}
          {webcam.link && (
            <Button
              className="rounded shadow-md bg-sky-500 data-[hover]:bg-sky-600 data-[active]:bg-sky-700 py-2 px-4 text-sm text-white transition duration-200"
              onClick={() => window.open(webcam.link)}
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
      <AnimatePresence>
        {isOpen && selectedImage && (
          <Dialog
            static
            open={isOpen}
            onClose={closeDialog}
            className="relative z-50"
          >
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            {/* Modal container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-[90vw] h-[90vh] max-w-6xl max-h-[90vh] space-y-4 rounded-xl bg-white p-6 overflow-auto" // Added overflow-auto
              >
                <DialogTitle className="text-lg font-bold">
                  Selected Image
                </DialogTitle>
                <div className="flex justify-center items-center">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1200}
                    height={800}
                    unoptimized
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="rounded bg-gray-200 px-4 py-2"
                    onClick={closeDialog}
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
