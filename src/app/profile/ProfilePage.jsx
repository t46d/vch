"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Globe, Heart } from 'lucide-react';

export default function ProfilePage({ initialProfile }) {
  const [profile] = useState(initialProfile);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-10 px-4">
      <div className="max-w-3xl mx-auto glass rounded-2xl p-8 animate-slide-up">
        <div className="flex justify-between items-start mb-8">
          <Link href="/discover" className="flex items-center gap-2 text-electric hover:text-cyan-300 transition-colors">
            <Globe size={20} />
            Discover Users
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/50 hover:bg-red-700/70 text-white font-semibold rounded-lg transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        <div className="text-center mb-10">
          <div className="w-36 h-36 mx-auto rounded-full bg-gradient-neon flex items-center justify-center text-6xl font-extrabold text-black mb-4 animate-glow">
            {profile.name ? profile.name[0].toUpperCase() : 'U'}
          </div>
          <h1 className="text-4xl font-bold gradient-text">{profile.name || 'User'}</h1>
          <p className="text-xl text-gray-400 mt-2">
            {profile.age ? `${profile.age} years old` : 'Age not specified'}
          </p>
        </div>

        <div className="border-t border-gray-700 pt-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-300 mb-3 neon-text">Bio / Motto</h3>
          <p className="text-gray-400 text-lg">
            {profile.bio || 'No bio added yet. Tell the world about yourself!'}
          </p>
        </div>

        {profile.interests && profile.interests.length > 0 && (
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-semibold text-gray-300 mb-3 neon-text-pink">Interests</h3>
            <div className="flex flex-wrap gap-3">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
