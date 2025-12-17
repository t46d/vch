import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export async function signUp({ email, password }) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Signup Error:', error.message);
    return { error };
  }
  return { data };
}

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

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Signout Error:', error.message);
    return { error };
  }
  return { success: true };
}
