"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    bio: '',
    interests: []
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestsChange = (e) => {
    const interests = e.target.value.split(',').map(i => i.trim()).filter(i => i);
    setFormData({ ...formData, interests });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSigningUp(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSigningUp(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsSigningUp(false);
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { name: formData.name }
      }
    });

    if (authError) {
      setError(authError.message);
      setIsSigningUp(false);
      return;
    }

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          user_id: authData.user.id,
          name: formData.name,
          age: parseInt(formData.age) || null,
          bio: formData.bio,
          interests: formData.interests
        }]);

      if (profileError) {
        console.error('Profile error:', profileError);
      }
    }

    setSuccess(true);
    setIsSigningUp(false);
    setTimeout(() => router.push('/login'), 2000);
  };

  if (success) {
    return (
      <div className="w-full max-w-md p-8 glass rounded-2xl text-center animate-fade-in">
        <div className="text-6xl mb-4 text-green-400">✓</div>
        <h2 className="text-3xl font-bold gradient-text">Account Created!</h2>
        <p className="text-gray-400 mt-4">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl p-8 glass rounded-2xl animate-slide-up">
      <h2 className="text-3xl font-bold text-center gradient-text mb-6">
        Create Account
      </h2>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
            <input
              name="age"
              type="number"
              min="18"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password *</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Interests (comma-separated)</label>
          <input
            type="text"
            onChange={handleInterestsChange}
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500"
            placeholder="gaming, music, travel"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-900/40 p-3 rounded-md animate-fade-in">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSigningUp}
          className="w-full py-3 bg-gradient-neon text-black font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
        >
          {isSigningUp ? 'Creating Account...' : 'Sign Up'}
        </button>
        
        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-cyan-400 hover:text-cyan-300">Sign in</a>
        </div>
      </form>
    </div>
  );
}
