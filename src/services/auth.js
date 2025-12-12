// src/services/auth.js
// Server Actions for Authentication

'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * دالة تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
 * @param {FormData} formData - البيانات المرسلة من نموذج تسجيل الدخول
 * @returns {object | undefined} - كائن يحتوي على الخطأ في حالة الفشل
 */
export async function signIn(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    // في حالة النجاح، يتم توجيه المستخدم إلى صفحة الاكتشاف
    redirect('/discover');
}

/**
 * دالة تسجيل الخروج (Server Action)
 * @returns {void}
 */
export async function signOut() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    redirect('/login');
}

// **ملاحظة:** تم حذف دالة signUp لأن منطقها يتم الآن إدارته بالكامل في جانب العميل (SignupForm.jsx)
// بما في ذلك إنشاء الملف الشخصي.