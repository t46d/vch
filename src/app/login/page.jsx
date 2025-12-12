// src/app/login/page.jsx
// هذه الصفحة هي Server Component

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import LoginForm from './LoginForm'; // سننشئ هذا الملف لاحقًا

export default async function LoginPage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // التحقق من الجلسة الحالية
    const { data, error } = await supabase.auth.getUser();

    // إذا كان المستخدم مسجلاً، قم بتحويله إلى صفحة الاكتشاف
    if (data?.user) {
        redirect('/discover');
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{
            // خلفية سوداء مظلمة لـ Cyberpunk
            background: 'radial-gradient(circle at center, rgba(10, 10, 10, 1) 0%, rgba(0, 0, 0, 1) 100%)'
        }}>
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1
                        className="text-6xl font-extrabold mb-2 tracking-tighter"
                        style={{
                            background: 'linear-gradient(90deg, #00F0FF, #FF00C8)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.5))'
                        }}
                    >
                        VEXACHAT
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Await your next connection.
                    </p>
                </div>

                {/* مكون العميل لتسجيل الدخول / التسجيل */}
                <LoginForm />

            </div>
        </div>
    );
}