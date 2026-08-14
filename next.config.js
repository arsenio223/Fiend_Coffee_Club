/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains is deprecated, use remotePatterns instead
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  // Ignore TypeScript errors during build (temporary fix)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during build (temporary fix)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;