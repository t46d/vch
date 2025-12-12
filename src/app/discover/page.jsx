// src/app/discover/page.jsx
// هذا Server Component (لا يحتاج إلى 'use client')

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function DiscoverPage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user || error) {
        redirect('/login');
    }
    
    // منطق جلب قائمة المستخدمين/المستشارين
    const { data: discoveryData, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .limit(10); 
    
    if (fetchError) {
        console.error("Error fetching discover data:", fetchError);
    }

    // ملاحظة: إذا كنت تنوي إضافة تفاعل (مثل أزرار 'Match' أو 'Like')،
    // يجب أن تستدعي هنا مكون عميل (Client Component) وتمرر له البيانات.
    
    return (
        <div className="pt-20 text-white p-4">
            <h1 className="text-4xl text-center">Discover Users</h1>
            {/* عرض البيانات كمثال */}
            <pre className="mt-4 p-4 bg-gray-800 rounded">
                {JSON.stringify(discoveryData, null, 2)}
            </pre>
        </div>
    );
}
