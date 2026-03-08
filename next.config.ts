import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pila.it" },
      { protocol: "https", hostname: "lovevda.it" },
      { protocol: "https", hostname: "www.lovevda.it" },
      { protocol: "https", hostname: "webtv.feratel.com" },
      { protocol: "https", hostname: "wtvpict.feratel.com" },
      { protocol: "https", hostname: "wtvpano.feratel.com" },
      { protocol: "https", hostname: "www.skylinewebcams.com" },
      { protocol: "https", hostname: "embed.skylinewebcams.com" },
      { protocol: "https", hostname: "app.webcam-hd.com" },
      { protocol: "https", hostname: "www.trinum.com" },
      { protocol: "https", hostname: "www.vialattea.it" },
      { protocol: "https", hostname: "g0.ipcamlive.com" },
      { protocol: "https", hostname: "www.webcamvialattea.it" },
      { protocol: "https", hostname: "panomax.com" },
      { protocol: "https", hostname: "live-image.panomax.com" },
      { protocol: "https", hostname: "www.skaping.com" },
      { protocol: "https", hostname: "www.monterosa2000.it" },
      { protocol: "https", hostname: "pratonevoso.com" },
    ],
  },
};

export default nextConfig;
