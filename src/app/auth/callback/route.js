// src/app/auth/callback/route.js

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') || '/profile';

    if (code) {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        // تبادل رمز التأكيد (code) بجلسة المستخدم (session)
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return redirect(next);
        }
    }

    return redirect('/login?error=Could not verify your email address.');
}