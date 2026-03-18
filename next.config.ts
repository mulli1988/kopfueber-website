import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Uploadthing
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "*.ufs.sh" },
      // Etsy (für spätere Migration)
      { protocol: "https", hostname: "i.etsystatic.com" },
    ],
  },
};

export default nextConfig;
