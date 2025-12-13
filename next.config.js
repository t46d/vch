/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['your-supabase-project.supabase.co']
  }
};

module.exports = nextConfig;
