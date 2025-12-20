"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import ChatBubble from '@/components/ChatBubble';
import { useToast } from '@/context/ToastContext';

export default function ChatPage() {
  const params = useParams();
  const conversationId = params?.conversationId;
  const supabase = createClient();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    if (!conversationId) return;

    let mounted = true;
    let userId = null;

    const load = async () => {
      try {
        const sessionRes = await supabase.auth.getUser();
        userId = sessionRes?.data?.user?.id || null;

        const { data, error } = await supabase
          .from('messages')
          .select('id, content, created_at, sender_id')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        if (mounted) setMessages(data || []);
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
      })
      .subscribe();

    return () => {
      mounted = false;
      try { channel.unsubscribe(); } catch (e) { }
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
    } catch (err) {
      console.error('Send message error', err);
      addToast('فشل إرسال الرسالة', 'error');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto glass p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Chat — {conversationId}</h2>

        <div className="space-y-3 h-[60vh] overflow-y-auto p-2">
          {loading ? <p className="text-gray-400">Loading...</p> : messages.map(m => (
            <ChatBubble key={m.id} isMine={m.sender_id === (supabase?.auth?.session?.user?.id || null)} content={m.content} timestamp={new Date(m.created_at).toLocaleTimeString()} />
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 px-4 py-2 rounded-md bg-gray-900 border border-gray-700" placeholder="Type a message..." />
          <button onClick={send} className="px-4 py-2 bg-cyan-500 rounded-md">Send</button>
        </div>
      </div>
    </div>
  );
}
