// src/services/matching.js

// 🚨 الإعلان عن أن الملف بأكمله هو ملف Server Actions (خادم)
'use server'; 

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers'; // يمكن أن يبقى هذا الاستيراد الآن لأنه 'use server'
import { getMyProfile } from './profile'; // نحتاج لمعرف الملف الشخصي للمستخدم الحالي

/**
 * دالة لإنشاء عميل Supabase على الخادم.
 * @returns {object} عميل Supabase.
 */
const getSupabaseServerClient = () => {
    // يجب استدعاء cookies داخل نطاق Server Component أو Server Action
    const cookieStore = cookies();
    return createClient(cookieStore);
};

/**
 * 1. جلب قائمة الملفات الشخصية التي لم يتفاعل معها المستخدم بعد.
 * يتم استخدام هذه الدالة في Server Component: discover/page.jsx (للجلب الأولي)
 * @param {number} limit - الحد الأقصى لعدد الملفات الشخصية المراد جلبها.
 * @returns {object} قائمة بالملفات الشخصية والخطأ.
 */
export async function getDiscoveryProfiles(limit = 10) {
    const supabase = getSupabaseServerClient();
    // 🛑 ملاحظة: دالة getMyProfile في ملف profile.js يجب أن تستخدم 'use server' أيضاً
    const { profile: myProfile } = await getMyProfile();

    if (!myProfile || !myProfile.id) {
        return { profiles: null, error: 'Profile not found or not authenticated.' };
    }

    const myProfileId = myProfile.id;

    // أولاً: جلب قائمة بجميع معرفات الملفات الشخصية التي تفاعل معها المستخدم (أعجب أو تجاوز)
    const { data: interactionIds, error: interactionError } = await supabase
        .from('matches')
        .select('target_profile_id')
        .eq('source_profile_id', myProfileId);

    if (interactionError) {
        console.error('Error fetching interaction IDs:', interactionError);
        return { profiles: null, error: 'Failed to fetch interactions.' };
    }

    // لتجنب خطأ قاعدة بيانات عند تمرير قائمة فارغة
    const interactedIds = interactionIds.map(i => i.target_profile_id);
    const alreadyInteractedIds = interactedIds.length > 0 ? interactedIds : [0]; 

    // ثانياً: جلب الملفات الشخصية التي لم يتفاعل معها المستخدم
    const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, name, age, bio, location, avatar_url, interests, user_id') // أضفنا user_id لأنه مفيد
        .neq('id', myProfileId) // استبعاد الملف الشخصي للمستخدم الحالي
        .not('id', 'in', `(${alreadyInteractedIds.join(',')})`) // استبعاد من تم التفاعل معهم
        .limit(limit);

    if (profileError) {
        console.error('Error fetching discovery profiles:', profileError);
        return { profiles: null, error: 'Failed to fetch discovery profiles.' };
    }

    return { profiles, error: null };
}

/**
 * 2. معالجة تفاعل المستخدم (إعجاب/تجاوز).
 * يتم استخدام هذه الدالة في Server Action داخل discover/page.jsx
 * @param {number} targetProfileId - معرف الملف الشخصي الهدف (Profile ID).
 * @param {('like'|'pass'|'superlike')} actionType - نوع التفاعل.
 * @returns {object} نتيجة العملية (match: boolean, error: string).
 */
export async function handleInteraction(targetProfileId, actionType) {
    const supabase = getSupabaseServerClient();
    const { profile: myProfile } = await getMyProfile();

    if (!myProfile || !myProfile.id) {
        return { match: false, error: 'Authentication required.' };
    }

    const myProfileId = myProfile.id;

    // 1. تسجيل التفاعل في جدول matches
    const { error: insertError } = await supabase
        .from('matches')
        .insert({
            source_profile_id: myProfileId,
            target_profile_id: targetProfileId,
            is_liked: actionType === 'like' || actionType === 'superlike', // يسجل كـ Like حتى لو كان SuperLike
            is_superlike: actionType === 'superlike',
            created_at: new Date().toISOString(),
        });

    if (insertError) {
        // إذا كان التفاعل موجودًا بالفعل، نتجاهل الخطأ.
        if (insertError.code === '23505') { // رمز خطأ تكرار (Duplicate key)
             return { match: false, error: null };
        }
        console.error('Error inserting interaction:', insertError);
        return { match: false, error: 'Failed to record interaction.' };
    }

    let isMatch = false;

    if (actionType === 'like' || actionType === 'superlike') {
        // 2. التحقق من وجود "إعجاب متبادل" (Reverse Like)
        const { data: reverseMatch, error: matchError } = await supabase
            .from('matches')
            .select('id')
            .eq('source_profile_id', targetProfileId) // المصدر هو الهدف
            .eq('target_profile_id', myProfileId)     // الهدف هو المصدر
            .eq('is_liked', true)
            .single();

        if (matchError && matchError.code !== 'PGRST116') {
            console.error('Error checking for match:', matchError);
        }

        if (reverseMatch) {
            isMatch = true;
            // يمكنك إضافة منطق تحديث حالة التطابق هنا
        }
    }

    return { match: isMatch, error: null };
}
