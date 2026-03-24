import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fd10e8e1c7.cbaul-cdnwnd.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
