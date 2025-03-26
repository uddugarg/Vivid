import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: '',
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: '',
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
        port: '',
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "placeholder.co",
        port: '',
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "placeimg.com",
        port: '',
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "oaidallepiprodscus.blob.core.windows.net",
        port: '',
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
