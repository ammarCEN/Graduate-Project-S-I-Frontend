import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  ...(isProduction && {
    basePath: '/Graduate-Project-S-I-Frontend',
    assetPrefix: '/Graduate-Project-S-I-Frontend/',
  }),
};

export default nextConfig;
