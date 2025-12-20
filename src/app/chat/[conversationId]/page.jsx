"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import ChatBubble from '@/components/ChatBubble';
import TypingIndicator from '@/components/TypingIndicator';
import { useToast } from '@/context/ToastContext';
import ConversationsList from '@/components/ConversationsList';

export default function ChatPage() {
  const params = useParams();
  const conversationId = params?.conversationId;
  const supabase = createClient();
  const [messages, setMessages] = useState([]);
  const [profilesMap, setProfilesMap] = useState({});
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [typingUsers, setTypingUsers] = useState({});
  const { addToast } = useToast();
  const typingTimeoutRef = useRef(null);
  const typingChannelRef = useRef(null);
  const lastTypingRef = useRef(false);
  const myUserIdRef = useRef(null);

  useEffect(() => {
    if (!conversationId) return;

    let mounted = true;
    let userId = null;

    const load = async () => {
      try {
        const sessionRes = await supabase.auth.getUser();
        userId = sessionRes?.data?.user?.id || null;
        myUserIdRef.current = userId;

        const { data, error } = await supabase
          .from('messages')
          .select('id, content, created_at, sender_id')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        if (mounted) setMessages(data || []);
        // fetch profiles for senders to show avatars/names
        const senderIds = Array.from(new Set((data || []).map(m => m.sender_id).filter(Boolean)));
        if (senderIds.length > 0) {
          const { data: profiles } = await supabase.from('profiles').select('id, name, avatar_url').in('id', senderIds);
          const map = {};
          (profiles || []).forEach(p => { map[p.id] = p; });
          if (mounted) setProfilesMap(map);
        }
      } catch (err) {
        console.error('Fetch messages error', err);
        addToast('خطأ بجلب الرسائل', 'error');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    // Realtime subscription for new messages in this conversation
    const channel = supabase.channel(`messages:conversation:${conversationId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
        // fetch profile for the sender if missing
        const sid = payload.new.sender_id;
        if (sid && !profilesMap[sid]) {
          supabase.from('profiles').select('id, name, avatar_url').eq('id', sid).maybeSingle().then(res => {
            if (res?.data) setProfilesMap(m => ({ ...m, [res.data.id]: res.data }));
          }).catch(()=>{});
        }
      })
      .subscribe();

    // typing/broadcast channel
    const typingChannel = supabase.channel(`typing:conversation:${conversationId}`)
      .on('broadcast', { event: 'typing' }, (payload) => {
        const { user, typing } = payload;
        if (!user || !user.id) return;
        // ignore our own typing events
        if (myUserIdRef.current && user.id === myUserIdRef.current) return;
        setTypingUsers(prev => {
          const next = { ...prev };
          if (typing) next[user.id] = user;
          else delete next[user.id];
          return next;
        });
      })
      .subscribe();
    typingChannelRef.current = typingChannel;

    return () => {
      mounted = false;
      try { channel.unsubscribe(); } catch (e) { }
      try { typingChannelRef.current?.unsubscribe(); } catch (e) { }
    };
  }, [conversationId]);

  const send = async () => {
    if (!text.trim()) return;
    try {
      // include sender_id when available
      const sessionRes = await supabase.auth.getUser();
      const userId = sessionRes?.data?.user?.id || null;

      const payload = { conversation_id: conversationId, content: text };
      if (userId) payload.sender_id = userId;

      const { data, error } = await supabase.from('messages').insert(payload).select().single();
      if (error) throw error;
      setText('');
      // message will arrive via realtime subscription
      // if user has no avatar, create and persist a Dicebear avatar
      try {
        if (userId && (!profilesMap[userId] || !profilesMap[userId].avatar_url)) {
          const email = sessionRes?.data?.user?.email || sessionRes?.data?.user?.id;
          const avatar_url = `https://api.dicebear.com/6.x/identicon/svg?seed=${encodeURIComponent(email)}`;
          await supabase.from('profiles').upsert({ id: userId, avatar_url }, { onConflict: 'id' });
          setProfilesMap(m => ({ ...m, [userId]: { id: userId, name: sessionRes?.data?.user?.email, avatar_url } }));
        }
      } catch (e) {
        // non-fatal
      }
    } catch (err) {
      console.error('Send message error', err);
      addToast('فشل إرسال الرسالة', 'error');
    }
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // send typing broadcasts (uses typingChannelRef)
  const sendTyping = async (isTyping) => {
    try {
      const sessionRes = await supabase.auth.getUser();
      const uid = sessionRes?.data?.user?.id;
      if (!uid) return;
      // avoid sending duplicate state
      if (lastTypingRef.current === isTyping) return;
      lastTypingRef.current = isTyping;
      const me = { id: uid, name: sessionRes?.data?.user?.email || 'You', avatar_url: profilesMap[uid]?.avatar_url || null };
      const ch = typingChannelRef.current;
      if (ch) {
        ch.send({ type: 'broadcast', event: 'typing', payload: { user: me, typing: isTyping } }).catch(()=>{});
      }
    } catch (e) { }
  };

  const onInputChange = (e) => {
    setText(e.target.value);
    if (!conversationId) return;
    // mark typing true
    sendTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      sendTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen p-6 flex gap-6">
      <ConversationsList />

      <div className="flex-1 max-w-4xl glass p-4 rounded-xl flex flex-col">
        <h2 className="text-xl font-bold mb-4">Chat — {conversationId}</h2>

        <div className="flex-1 overflow-y-auto p-2 space-y-3" style={{ maxHeight: '65vh' }}>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            messages.map(m => {
              const sender = m.sender_id ? profilesMap[m.sender_id] : null;
              const isMine = m.sender_id === (supabase?.auth?.getUser && supabase?.auth?.getUser()?.data?.user?.id) || false;
              return (
                <ChatBubble key={m.id} isMine={isMine} content={m.content} timestamp={new Date(m.created_at).toLocaleTimeString()} avatar={sender?.avatar_url} name={sender?.name} />
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* typing indicators */}
        <div className="min-h-[36px]">
          <TypingIndicator users={Object.values(typingUsers)} />
        </div>

        <div className="mt-4 flex gap-2">
          <input value={text} onChange={onInputChange} className="flex-1 px-4 py-2 rounded-md bg-gray-900 border border-gray-700" placeholder="Type a message..." />
          <button onClick={send} className="px-4 py-2 bg-cyan-500 rounded-md">Send</button>
        </div>
      </div>
    </div>
  );
}
