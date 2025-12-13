import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // إنشاء عميل Supabase باستخدام متغيرات البيئة العامة
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
