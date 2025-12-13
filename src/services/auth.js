import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

/**
 * دالة لتسجيل مستخدم جديد
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} - بيانات الجلسة أو خطأ
 */
export async function signUp({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error('Signup Error:', error.message);
    return { error: error.message, success: false };
  }
}

/**
 * دالة لتسجيل دخول مستخدم
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} - بيانات الجلسة أو خطأ
 */
export async function signIn({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error('Signin Error:', error.message);
    return { error: error.message, success: false };
  }
}

/**
 * دالة لتسجيل الخروج
 * @returns {Promise<object>} - خطأ في حال الفشل
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Signout Error:', error.message);
    return { error: error.message, success: false };
  }
}
