import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
    ignoreDuringBuilds: true,
  },
    typescript: {
    ignoreBuildErrors: process.env.SKIP_TS_ERRORS === 'true',
  },
};

export default nextConfig;
