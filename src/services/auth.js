import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

/**
 * دالة لتسجيل مستخدم جديد
 * @param {string} email
 * @param {string} password
 */
export async function signUp({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // إعادة توجيه المستخدم إلى صفحة التحقق بعد التسجيل
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Signup Error:', error.message);
    return { error };
  }
  return { data };
}

/**
 * دالة لتسجيل دخول مستخدم
 * @param {string} email
 * @param {string} password
 */
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Signin Error:', error.message);
    return { error };
  }
  return { data };
}

/**
 * دالة لتسجيل الخروج
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Signout Error:', error.message);
    return { error };
  }
  return { success: true };
}
