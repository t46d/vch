import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export function createClient(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Guard: if Supabase env vars are not set (e.g., during local prerender/build),
  // return a safe noop client to avoid build-time exceptions. In production
  // environments (Vercel) ensure env vars are configured so real client is used.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    const noopSupabase = {
      auth: {
        async getUser() { return { data: { user: null }, error: null } },
      },
      from() {
        return {
          select: async () => ({ data: [], error: null }),
          insert: async () => ({ data: null, error: null }),
          update: async () => ({ data: null, error: null }),
          eq: () => ({ select: async () => ({ data: [], error: null }) }),
          order: () => ({ limit: async () => ({ data: [], error: null }) }),
          in: () => ({ select: async () => ({ data: [], error: null }) }),
        }
      },
      // minimal rpc placeholder
      rpc: async () => ({ data: null, error: null }),
    }

    return { supabase: noopSupabase, response }
  }

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  return { supabase, response }
}

export const config = {
  runtime: 'nodejs'
}
