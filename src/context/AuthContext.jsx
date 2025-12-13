'use client';

import { createContext, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // دالة لجلب الجلسة الحالية
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    };

    getSession();

    // الاشتراك في تغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    // إلغاء الاشتراك عند حذف المكون
    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
