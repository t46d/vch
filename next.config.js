/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  // ميزات جديدة في Next.js 15
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js', 'lucide-react']
  }
};

module.exports = nextConfig;
