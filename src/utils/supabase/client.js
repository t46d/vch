import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // يجب أن تكون هذه المتغيرات متاحة في إعدادات البيئة (Vercel Environment Variables)
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
