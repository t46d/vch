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
  const { data: convs, error } = await supabase
    .from('conversations')
    .select(
      `id, created_at, profile_id1, profile_id2`
    )
    .or(`profile_id1.eq.${myProfileId},profile_id2.eq.${myProfileId}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching conversations:', error);
    return { conversations: [], error: error.message };
  }

  // للحصول على بيانات الملف الشخصي والطرف الآخر وآخر رسالة لكل محادثة، نجري استدعاءات إضافية
  const conversations = [];
  for (const conv of convs) {
    // احضر بيانات ملفات الطرفين
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, name, avatar_url')
      .in('id', [conv.profile_id1, conv.profile_id2]);

    if (profilesError) {
      console.error('Error fetching profiles for conversation:', profilesError);
      continue;
    }

    const profile1 = profiles.find(p => p.id === conv.profile_id1) || null;
    const profile2 = profiles.find(p => p.id === conv.profile_id2) || null;
    const otherParty = profile1 && profile1.id === myProfileId ? profile2 : profile1;

    // آخر رسالة
    const { data: latestMsgs, error: latestError } = await supabase
      .from('messages')
      .select('id, content, created_at, sender_id')
      .eq('conversation_id', conv.id)
      .order('created_at', { ascending: false })
      .limit(1);

    const latestMessage = (latestMsgs && latestMsgs[0]) || null;

    conversations.push({
      id: conv.id,
      otherParty,
      latestMessage,
      created_at: conv.created_at,
    });
  }

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