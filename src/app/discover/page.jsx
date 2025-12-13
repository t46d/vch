"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Search, Heart, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DiscoverPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
   
    let query = supabase
      .from('profiles')
      .select('id, name, bio, interests, age')
      .order('created_at', { ascending: false });

    if (user) {
      query = query.neq('user_id', user.id);
    }

    const { data, error } = await query;

    if (!error) setUsers(data);
    setLoading(false);
  }

  const filteredUsers = users
    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-12 px-4 md:px-8">
      {/* Header & Search */}
      <div className="container max-w-6xl mb-12 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Discover New Souls</h1>
            <p className="text-gray-400">Find your perfect match in the digital neon void.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/profile" className="p-3 glass rounded-xl hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} className="text-white" />
            </Link>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-electric transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search by name or interests..."
                className="glass w-full md:w-80 pl-12 pr-4 py-3 rounded-xl focus:neon-border transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Discovery Grid */}
      <div className="container max-w-6xl">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500 py-10 glass rounded-lg max-w-xl mx-auto">
            <h3 className="text-xl font-bold mb-2">No Matches Found</h3>
            <p>Try widening your search criteria or come back later.</p>
          </div>
        ) : (
          <div className="grid-auto-fit">
            {filteredUsers.map((userProfile) => (
              <div key={userProfile.id} className="glass card-hover rounded-2xl overflow-hidden group">
                {/* User Avatar Space */}
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-electric/20 text-electric text-xs font-bold rounded-full backdrop-blur-md border border-electric/30">
                      {userProfile.age || '??'} YRS
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{userProfile.name}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {userProfile.bio || "In a world of code, I'm looking for a human connection."}
                  </p>

                  {/* Interests Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {userProfile.interests?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider text-cyan-400 font-semibold">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button className="flex-1 py-2 bg-gradient-neon text-black font-bold rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                      <Heart size={18} /> Match
                    </button>
                    <button className="p-2 glass text-white rounded-lg hover:bg-white/10 transition-colors">
                      <MessageSquare size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
