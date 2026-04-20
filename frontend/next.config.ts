import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['localhost', '127.0.0.1'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '**',
      },
    ],
  },
};

export default nextConfig;
