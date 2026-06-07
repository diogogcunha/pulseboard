import type { NextConfig } from 'next';

// WHY THIS CONFIG: Strict mode for React, plus output configuration
// for Docker container builds.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow images from any HTTPS source (adjust in production to specific domains)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
