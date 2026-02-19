import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/orbit-deals' : '',
  assetPrefix: isProd ? '/orbit-deals' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
