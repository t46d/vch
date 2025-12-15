// src/services/chat.js

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { getMyProfile } from './profile'; // نحتاج لمعرف الملف الشخصي

/**
 * دالة لإنشاء عميل Supabase على الخادم.
 * @returns {object} عميل Supabase.
 */
const getSupabaseServerClient = () => {
  const cookieStore = cookies();
  return createClient(cookieStore);
};

/**
 * 1. جلب قائمة المحادثات النشطة للمستخدم الحالي.
 * يتم استخدام هذه الدالة في Server Component: chat/page.jsx
 * @returns {Array<object>} قائمة بالمحادثات (conversations).
 */
export async function getConversations() {
  const supabase = getSupabaseServerClient();
  const myProfile = await getMyProfile();

  if (!myProfile || !myProfile.id) {
    return { conversations: [], error: 'Authentication required.' };
  }

  const myProfileId = myProfile.id;

  // جلب المحادثات التي يكون المستخدم الحالي إما الطرف الأول (profile1) أو الثاني (profile2) فيها.
  // يتم جلب اسم وصورة الطرف الآخر مع آخر رسالة.
  const { data, error } = await supabase
    .from('conversations')
    .select(
      `
        id, 
        created_at,
        profile1:profile_id1 (id, name, avatar_url),
        profile2:profile_id2 (id, name, avatar_url),
        latest_message:messages(content, created_at, sender_id)
      `
    )
    .or(`profile_id1.eq.${myProfileId},profile_id2.eq.${myProfileId}`)
    .order('created_at', { foreignTable: 'messages', ascending: false })
    .limit(1, { foreignTable: 'messages' });


  if (error) {
    console.error('Error fetching conversations:', error);
    return { conversations: [], error: error.message };
  }

  // معالجة البيانات لتحديد الطرف الآخر (The Other Party)
  const conversations = data.map(conv => {
    const otherParty = conv.profile1.id === myProfileId ? conv.profile2 : conv.profile1;
    const latestMessage = conv.latest_message ? conv.latest_message[0] : null;
    
    return {
      id: conv.id,
      otherParty,
      latestMessage,
      created_at: conv.created_at,
    };
  });

  return { conversations, error: null };
}

/**
 * 2. جلب تاريخ الرسائل لمحادثة محددة.
 * @param {number} conversationId - معرف المحادثة.
 * @returns {Array<object>} قائمة بالرسائل.
 */
export async function getMessages(conversationId) {
  const supabase = getSupabaseServerClient();
  
  // تحقق مبدئي: يجب أن يكون المستخدم جزءاً من هذه المحادثة (يمكن إضافة التحقق هنا عبر RLS).
  
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id, 
      conversation_id, 
      content, 
      created_at, 
      sender_id
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true }); // الرسائل القديمة أولاً

  if (error) {
    console.error('Error fetching messages:', error);
    return { messages: [], error: error.message };
  }

  return { messages: data, error: null };
}


/**
 * 3. إرسال رسالة جديدة.
 * يتم استخدام هذه الدالة في Server Action داخل صفحة الدردشة.
 * @param {number} conversationId - معرف المحادثة.
 * @param {string} content - محتوى الرسالة.
 * @returns {object} الرسالة المرسلة أو رسالة خطأ.
 */
export async function sendMessage(conversationId, content) {
  const supabase = getSupabaseServerClient();
  const myProfile = await getMyProfile();

  if (!myProfile || !myProfile.id) {
    return { message: null, error: 'Authentication required.' };
  }

  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: myProfile.id,
      content: content,
    })
    .select()
    .single();

  if (error) {
    console.error('Error sending message:', error);
    return { message: null, error: error.message };
  }

  // **ملاحظة:** في التطبيقات الحقيقية، يجب استخدام Realtime Subscriptions هنا.
  
  return { message: data, error: null };
}