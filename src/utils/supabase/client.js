import { createBrowserClient } from "@supabase/ssr";

// Lazily create browser client. During server prerender/build, env vars may
// be missing — avoid throwing by returning a noop object. In production (Vercel)
// ensure env vars `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set.
export const createClient = () => {
  if (typeof window === 'undefined') {
    // server environment — return noop to avoid build-time errors
    return {
      auth: {
        async signInWithPassword() { return { data: null, error: new Error('Supabase client not available on server during prerender') } },
        async signOut() { return { error: new Error('Supabase client not available') } },
      },
      from() {
        return {
          select: async () => ({ data: [], error: null }),
        }
      }
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase client will be a noop. Set env vars in deployment.');
    return {
      auth: {
        async signInWithPassword() { return { data: null, error: new Error('Missing Supabase env vars') } },
      },
      from() {
        return { select: async () => ({ data: [], error: null }) }
      }
    }
  }

  return createBrowserClient(url, key);
};
