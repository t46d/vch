import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// دالة تحديث الجلسة يجب أن تُصَدَّر لتُستَدعَى من الملف الرئيسي (src/middleware.js)
export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          request.cookies.set({ name, value, ...options });
          supabaseResponse = NextResponse.next({
            request,
          });
          supabaseResponse.cookies.set({ name, value, ...options });
        },
        remove: (name, options) => {
          request.cookies.set({ name, value: '', ...options });
          supabaseResponse = NextResponse.next({
            request,
          });
          supabaseResponse.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // تحديث الجلسة عن طريق استدعاء getUser() للتأكد من صلاحيتها
  await supabase.auth.getUser();

  return supabaseResponse;
}
