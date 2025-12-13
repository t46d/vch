import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/profile');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <LoginForm />
      <div className="absolute top-4 right-4 text-sm text-gray-500">
        <a href="/signup" className="text-cyan-400 hover:text-cyan-300">New User?</a>
      </div>
    </div>
  );
}
