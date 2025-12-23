"use client";

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/profile');
      router.refresh();
    }
    setLoading(false);
  };

  const handleGuestLogin = async () => {
    setError(null);
    setGuestLoading(true);

    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
      setError(error.message);
    } else {
      router.push('/discover');
      router.refresh();
    }
    setGuestLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      {/* Animated Background for Login */}
      <div className="animated-bg"></div>
      
      <div className="glass w-full max-w-md rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">Sign in to your VeXachat account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-900/50 text-gray-400">أو</span>
          </div>
        </div>

        {/* Guest Login Button */}
        <button
          onClick={handleGuestLogin}
          disabled={guestLoading}
          className="w-full py-3 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 font-medium"
        >
          {guestLoading ? 'جاري الدخول...' : 'الدخول كضيف'}
        </button>
        <p className="text-gray-500 text-xs text-center mt-2">
          تصفح الملفات الشخصية بدون حساب
        </p>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
