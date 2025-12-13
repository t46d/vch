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
  // إعدادات مهمة لـ Vercel
  output: 'standalone',
  
  // إذا كنت تستخدم Server Actions (اختياري)
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
    optimizePackageImports: ['@supabase/supabase-js', 'lucide-react']
  }
};

module.exports = nextConfig;
