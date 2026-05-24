import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "50eacb477d.nxcli.io",
      },
    ],
  },
};

export default nextConfig;
