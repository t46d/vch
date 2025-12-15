'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/services/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (isLoading) return null; // لا تظهر شيء أثناء تحميل الجلسة

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* الشعار */}
          <Link href="/" passHref className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            VeXachat
          </Link>

          {/* روابط التنقل */}
          <nav className="flex items-center space-x-4">
            <Link href="/discover" passHref className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition duration-150">
              اكتشف
            </Link>
            
            {session ? (
              <>
                <Link href="/profile" passHref className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition duration-150">
                  الملف الشخصي
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 text-sm font-medium rounded-md bg-red-500 hover:bg-red-600 text-white transition duration-150"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <>
                <Link href="/login" passHref className="px-3 py-1 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition duration-150">
                  تسجيل الدخول
                </Link>
                <Link href="/signup" passHref className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition duration-150">
                  إنشاء حساب
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
