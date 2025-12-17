'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { Menu, X, User, LogOut, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { session, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
    setIsOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'الرئيسية', icon: Sparkles },
    { href: '/discover', label: 'اكتشف', icon: Sparkles },
  ];

  if (session) {
    navLinks.push({ href: '/profile', label: 'ملفي', icon: User });
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'glass-strong py-3 shadow-neon' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* الشعار */}
            <Link href="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 rounded-xl bg-gradient-cyber flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-dark-900" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text tracking-tight">
                  VeXaChat
                </span>
                <span className="text-xs text-gray-400">منصة الشات المستقبلية</span>
              </div>
            </Link>

            {/* روابط التنقل - Desktop */}
            <nav className="hidden md:flex items-center space-x-2 space-x-reverse">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-electric/20 text-electric nav-link-active'
                        : 'nav-link hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 ml-2" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
              
              {session ? (
                <div className="flex items-center space-x-3 space-x-reverse border-r border-white/10 pr-3">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-8 h-8 rounded-full bg-gradient-neon flex items-center justify-center">
                      <span className="text-sm font-bold text-dark-900">
                        {session.user?.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden lg:flex flex-col">
                      <span className="text-sm font-medium text-gray-200">
                        {session.user?.email?.split('@')[0]}
                      </span>
                      <span className="text-xs text-gray-400">مرحباً!</span>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4 ml-2" />
                    <span className="font-medium">خروج</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Link
                    href="/login"
                    className="btn-secondary flex items-center"
                  >
                    <span>دخول</span>
                  </Link>
                  <Link
                    href="/signup"
                    className="btn-primary flex items-center"
                  >
                    <Sparkles className="w-4 h-4 ml-2" />
                    <span>جديد</span>
                  </Link>
                </div>
              )}
            </nav>

            {/* زر القائمة للجوال */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden glass w-10 h-10 rounded-xl flex items-center justify-center"
              aria-label="قائمة التنقل"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-electric" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* القائمة الجوالية */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-dark-950/90 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-64 glass-strong shadow-xl animate-slideIn">
            <div className="p-6">
              {/* معلومات المستخدم */}
              {session && (
                <div className="mb-6 p-4 glass rounded-xl">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center">
                      <User className="w-6 h-6 text-dark-900" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white truncate">
                        {session.user?.email?.split('@')[0]}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* الروابط الجوالية */}
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-electric/20 text-electric'
                          : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5 ml-3" />
                      <span className="font-medium text-lg">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* الأزرار الجوالية */}
              <div className="mt-8 space-y-4">
                {session ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center p-4 glass rounded-xl text-gray-300 hover:text-white"
                    >
                      <User className="w-5 h-5 ml-2" />
                      <span>إدارة الحساب</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center p-4 bg-red-500/10 hover:bg-red-500/20 text-red-300 rounded-xl"
                    >
                      <LogOut className="w-5 h-5 ml-2" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full btn-secondary text-center py-4"
                    >
                      تسجيل الدخول
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block w-full btn-primary text-center py-4"
                    >
                      إنشاء حساب جديد
                    </Link>
                  </>
                )}
              </div>

              {/* معلومات إضافية */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-400 text-center">
                  © {new Date().getFullYear()} VeXaChat
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation for mobile menu */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
