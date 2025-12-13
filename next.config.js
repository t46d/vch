/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // مهم لـ Vercel
    domains: [
      'your-supabase-project.supabase.co',
      'ugvdwxjnzrofrxekbhhm.supabase.co' // إذا كنت تستخدم السيرفر الموجود
    ]
  },
  // إضافة للإنتاج
  output: 'standalone' // اختياري لكنه يحسن الأداء
};

module.exports = nextConfig;
