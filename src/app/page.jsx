import { createClient } from '@/utils/supabase/server'
import { Monitor, ShieldCheck, Zap } from 'lucide-react'

export default async function HomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-purple-600/20 rounded-full border border-purple-500/30">
            <Zap className="w-12 h-12 text-purple-500 fill-purple-500" />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Vexachat v2.0
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-colors">
            <ShieldCheck className="w-8 h-8 text-green-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold">حالة الاتصال</h3>
            <p className="text-gray-400 text-sm mt-2">
              {user ? 'متصل بقاعدة البيانات' : 'Supabase متصل وجاهز'}
            </p>
          </div>

          <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-blue-500/50 transition-colors">
            <Monitor className="w-8 h-8 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold">المستخدم الحالي</h3>
            <p className="text-gray-400 text-sm mt-2 truncate px-2">
              {user ? user.email : 'لم يتم تسجيل الدخول'}
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-sm italic">
          Node.js {process.version} | Next.js 14.2.10
        </p>
      </div>
    </div>
  )
}