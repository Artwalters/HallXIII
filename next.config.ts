import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/HallXIII' : '',
  assetPrefix: isProd ? '/HallXIII/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
