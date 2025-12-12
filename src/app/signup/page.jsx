// src/app/signup/page.jsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import SignupForm from './SignupForm';

export default async function SignupPage() {
  const supabase = createClient();

  // التحقق مما إذا كان المستخدم مسجلاً دخوله بالفعل
  const { data: { user } } = await supabase.auth.getUser();

  // إذا كان المستخدم مسجلاً دخوله، يتم توجيهه إلى صفحة الملف الشخصي
  if (user) {
    redirect('/profile');
  }

  // إذا لم يكن مسجلاً دخوله، نعرض مكون التسجيل
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <SignupForm />
    </div>
  );
}