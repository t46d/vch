import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function getCurrentUserProfile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('name, bio, interests, age')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return profile || { 
    name: user.email.split('@')[0], 
    bio: 'User profile not set up yet.', 
    interests: [] 
  };
}
