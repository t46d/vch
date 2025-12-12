// src/app/profile/page.jsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login') // إعادة توجيه إذا لم يكن مسجل دخول
  }

  return (
    <div className="p-8 text-white">
      <h1>مرحباً بك {user.email}</h1>
    </div>
  )
}