"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function ConversationsList() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data: userRes } = await supabase.auth.getUser();
        const userId = userRes?.data?.user?.id;
        if (!userId) return setConversations([]);

        const { data, error } = await supabase
          .from('conversations')
          .select('id, profile_id1, profile_id2, created_at')
          .or(`profile_id1.eq.${userId},profile_id2.eq.${userId}`)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (!mounted) return;

        // map to show other party id
        const convs = (data || []).map(c => {
          const other = (c.profile_id1 === userId) ? c.profile_id2 : c.profile_id1;
          return { id: c.id, otherId: other, created_at: c.created_at };
        });

        // fetch profiles for the other parties
        const otherIds = Array.from(new Set(convs.map(x => x.otherId).filter(Boolean)));
        let profilesMap = {};
        if (otherIds.length > 0) {
          const { data: profiles } = await supabase.from('profiles').select('id, name, avatar_url').in('id', otherIds);
          (profiles || []).forEach(p => { profilesMap[p.id] = p; });
        }

        const mapped = convs.map(c => ({ ...c, other: profilesMap[c.otherId] }));
        setConversations(mapped);
      } catch (e) {
        console.error('Conversations fetch error', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  if (conversations.length === 0) return <div className="p-4 text-sm text-gray-400">No conversations yet</div>;

  return (
    <div className="w-72 border-r border-gray-800 p-2 overflow-y-auto h-[80vh]">
      {conversations.map(c => (
        <Link key={c.id} href={`/chat/${c.id}`} className="block p-3 rounded-md hover:bg-gray-800/50">
          <div className="flex items-center gap-3">
            {c.other?.avatar_url ? (
              <img src={c.other.avatar_url} alt={c.other?.name || 'avatar'} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm text-gray-300">{(c.other?.name||'?').slice(0,1).toUpperCase()}</div>
            )}
            <div>
              <div className="text-sm font-medium text-white">{c.other?.name || 'Conversation'}</div>
              <div className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
