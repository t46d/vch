import { createClient } from '@/utils/supabase/client';

export async function signUp({ email, password }) {
  const supabase = createClient();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Signup Error:', error.message || error);
      return { error };
    }
    return { data };
  } catch (err) {
    console.error('Signup exception:', err);
    return { error: err };
  }
}

export async function signIn({ email, password }) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Signin Error:', error.message || error);
      return { error };
    }
    return { data };
  } catch (err) {
    console.error('Signin exception:', err);
    return { error: err };
  }
}

export async function signOut() {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Signout Error:', error.message || error);
      return { error };
    }
    return { success: true };
  } catch (err) {
    console.error('Signout exception:', err);
    return { error: err };
  }
}
