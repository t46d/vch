import { createClient } from '@/utils/supabase/middleware'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  try {
    const { supabase, response } = createClient(request)
    const { data: { user } } = await supabase.auth.getUser()

    // Check if user is anonymous (guest)
    const isAnonymous = user?.is_anonymous === true

    // Redirect to login if not authenticated and trying to access protected routes
    // Anonymous users can access /discover but not /profile
    if (!user && (request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/discover'))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Anonymous users cannot access /profile - redirect to /discover
    if (isAnonymous && request.nextUrl.pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/discover', request.url))
    }

    // Redirect to profile if authenticated (non-anonymous) and trying to access auth pages
    if (user && !isAnonymous && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup'))) {
      return NextResponse.redirect(new URL('/profile', request.url))
    }

    // Anonymous users trying to access login/signup should be allowed (they might want to create account)
    // So we don't redirect them away from auth pages

    return response
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|auth/callback).*)',
  ],
}
