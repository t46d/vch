"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message || 'Failed to sign in.');
      } else {
        router.push('/profile');
        router.refresh();
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err?.message || 'حدث خطأ أثناء محاولة تسجيل الدخول.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 glass rounded-2xl animate-slide-up">
      <h2 className="text-3xl font-bold text-center gradient-text mb-6">
        Sign In
      </h2>

      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-900/40 p-3 rounded-md animate-fade-in">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSigningIn}
          className="w-full py-3 bg-gradient-neon text-black font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
        >
          {isSigningIn ? 'Signing in...' : 'Sign In'}
        </button>
        
        <div className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-cyan-400 hover:text-cyan-300">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}
