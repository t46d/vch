import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// رجاءً: دالة مساعدة على الخادم لإرجاع الملف الشخصي بصيغة متوافقة مع بقية الخدمات
export async function getCurrentUserProfile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getUser();

  const user = userData?.user || null;
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, name, bio, interests, age, user_id, location, avatar_url')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching profile:', error);
    return null;
  }

  return (
    profile || {
      id: null,
      name: user.email ? user.email.split('@')[0] : 'Anonymous',
      bio: 'User profile not set up yet.',
      interests: [],
      user_id: user.id,
    }
  );
}

// دالة متوافقة مع استدعاءات أخرى في المشروع (تُعيد كائن يحتوي `profile`)
export async function getMyProfile() {
  const profile = await getCurrentUserProfile();
  return { profile };
}
