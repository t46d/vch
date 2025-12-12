// src/services/profile.js

// 🚨 هذا الملف يجب أن يكون Server Action أو Server Module لأنه يستخدم next/headers
'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

/**
 * دالة لإنشاء عميل Supabase على الخادم باستخدام ملفات تعريف الارتباط.
 * @returns {object} عميل Supabase.
 */
const getSupabaseServerClient = () => {
    const cookieStore = cookies();
    // نستخدم createClient الذي قمنا بتصحيحه في utils/supabase/server.js
    return createClient(cookieStore);
};

/**
 * جلب الملف الشخصي للمستخدم الحالي.
 * @returns {object|null} بيانات الملف الشخصي أو null إذا لم يكن المستخدم موثقًا أو لم يتم العثور على الملف.
 */
export async function getMyProfile() {
    const supabase = getSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { profile: null, error: 'User not authenticated' };
    }

    // جلب الملف الشخصي بناءً على user_id
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, user_id, name, bio, age, location, avatar_url, interests, is_consultant, consultant_rate, specialties')
        .eq('user_id', user.id)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116: No rows found
        console.error('Error fetching profile:', error);
        return { profile: null, error: error.message };
    }
    
    // إذا لم يتم العثور على ملف شخصي، نُرجع كائن بـ user_id فقط
    if (!profile) {
        return { profile: { user_id: user.id }, error: null };
    }

    return { profile, error: null };
}

/**
 * تحديث الملف الشخصي للمستخدم الحالي.
 * يتم استخدام هذه الدالة في Server Action أو Route Handler.
 * @param {object} updates - كائن يحتوي على البيانات المراد تحديثها.
 * @returns {object|null} الملف الشخصي المحدث أو رسالة خطأ.
 */
export async function updateProfile(updates) {
    const supabase = getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Authentication required' };
    }

    // يمكن إضافة منطق تحقق هنا (مثل التحقق من أن age هو رقم)
    
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

    if (error) {
        console.error('Error updating profile:', error);
        return { error: error.message };
    }

    return { data, error: null };
}
