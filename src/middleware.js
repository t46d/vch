import { createClient } from '@/utils/supabase/middleware'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  try {
    const { supabase, response } = createClient(request)
    const { data: { user } } = await supabase.auth.getUser()

    // Redirect to login if not authenticated and trying to access protected routes
    if (!user && (request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/discover'))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Redirect to profile if authenticated and trying to access auth pages
    if (user && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup'))) {
      return NextResponse.redirect(new URL('/profile', request.url))
    }
    
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
