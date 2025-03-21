import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pila.it',
        port: '',
        pathname: '/webcams/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'www.lovevda.it',
        port: '',
        pathname: '/Media/LovevdaResp/Cache/Webcam/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'wtvpict.feratel.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'pratonevoso.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'pratonevoso.panomax.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
