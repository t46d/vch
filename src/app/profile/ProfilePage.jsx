// src/app/profile/ProfilePage.jsx
"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

// تم تعديل هذا المكون ليأخذ دالة تحديث كخاصية (prop) بدلاً من استدعاء Supabase مباشرة.
// هذا يفترض أننا سنستخدم Server Action في ملف page.jsx لاستدعاء updateProfile
export default function ProfilePage({ initialProfile, updateProfileServerAction }) {
    const [profile, setProfile] = useState(initialProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(initialProfile);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null);
    const router = useRouter();
    const supabase = createClient(); // عميل للقراءة وتسجيل الخروج

    // --- Logout Function ---
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    // --- Save Function (Uses Server Action) ---
    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);

        // نقوم بإرسال البيانات المحدثة إلى Server Action
        const updates = {
            name: editData.name,
            age: editData.age ? parseInt(editData.age) : null,
            bio: editData.bio,
            interests: editData.interests
        };

        // استدعاء Server Action بدلاً من Supabase المباشر
        const result = await updateProfileServerAction(updates);
        
        if (result.error) {
            setMessage({ type: 'error', text: result.error });
        } else {
            // تحديث حالة الملف الشخصي بالبيانات الجديدة
            setProfile(updates);
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => setMessage(null), 3000);
        }
        
        setIsSaving(false);
    };

    // --- Helper Functions ---
    const handleInterestsChange = (e) => {
        const interests = e.target.value.split(',').map(i => i.trim()).filter(i => i);
        setEditData({ ...editData, interests });
    };

    // ... (بقية منطق العرض بدون تغيير)

    if (isEditing) {
        return (
            <div className="min-h-screen bg-transparent text-white pt-24 pb-10 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-black/70 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl shadow-2xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-cyan-400">Edit Profile</h1>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditData(profile);
                                }}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                ✕ Cancel
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-indigo-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={editData.name || ''}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800/80 border-2 border-indigo-500/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-indigo-300 mb-2">Age</label>
                                <input
                                    type="number"
                                    value={editData.age || ''}
                                    onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800/80 border-2 border-indigo-500/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-indigo-300 mb-2">Bio</label>
                                <textarea
                                    rows={4}
                                    value={editData.bio || ''}
                                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800/80 border-2 border-indigo-500/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-indigo-300 mb-2">
                                    Interests (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={editData.interests?.join(', ') || ''}
                                    onChange={handleInterestsChange}
                                    className="w-full px-4 py-3 bg-gray-800/80 border-2 border-indigo-500/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="gaming, music, travel"
                                />
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full py-3 font-bold rounded-lg transition-all duration-200"
                                style={{
                                    background: isSaving ? '#4C7C5A' : 'linear-gradient(135deg, #00F0FF, #FF00C8)',
                                    color: '#0A0A0A',
                                    boxShadow: isSaving ? 'none' : '0 0 20px rgba(0,240,255,0.5)',
                                    cursor: isSaving ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-white pt-24 pb-10 px-4">
            <h1
                className="text-5xl text-center font-extrabold mb-10 tracking-widest"
                style={{ textShadow: '0 0 30px #00F0FF, 0 0 60px #FF00C8' }}
            >
                ACCESS GRANTED
            </h1>

            {message && (
                <div
                    className={`max-w-2xl mx-auto mb-6 p-4 rounded-lg border-2 ${
                        message.type === 'success'
                            ? 'bg-green-900/40 border-green-500/50 text-green-300'
                            : 'bg-red-900/40 border-red-500/50 text-red-300'
                        }`}
                >
                    {message.text}
                </div>
            )}

            <div className="max-w-2xl mx-auto">
                <div className="bg-black/70 backdrop-blur-xl border-2 border-indigo-500/50 rounded-2xl shadow-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
                    {/* Header Banner */}
                    <div
                        className="h-32 relative"
                        style={{
                            background: 'linear-gradient(135deg, #00F0FF, #FF00C8, #B500FF)',
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 8s ease infinite'
                        }}
                    >
                        <div className="absolute -bottom-16 left-8">
                            <div
                                className="w-32 h-32 rounded-full border-4 border-black flex items-center justify-center text-5xl font-bold"
                                style={{
                                    background: 'linear-gradient(135deg, #B500FF, #00F0FF)',
                                    boxShadow: '0 0 30px rgba(0,240,255,0.5)'
                                }}
                            >
                                {profile.name ? profile.name[0].toUpperCase() : 'U'}
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 px-8 pb-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-cyan-400 mb-1">
                                    {profile.name || 'Anonymous User'}
                                </h2>
                                <p className="text-xl text-indigo-400">
                                    {profile.age ? `${profile.age} years old` : 'Age not specified'}
                                </p>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
                                style={{ boxShadow: '0 0 20px rgba(0,240,255,0.3)' }}
                            >
                                ✏️ Edit Profile
                            </button>
                        </div>

                        <div className="border-t border-indigo-500/30 pt-6 mb-6">
                            <h3 className="text-lg font-semibold text-indigo-300 mb-3 flex items-center gap-2">
                                <span>📝</span> Bio
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {profile.bio || 'No bio added yet. Click edit to add one!'}
                            </p>
                        </div>

                        {profile.interests && profile.interests.length > 0 && (
                            <div className="border-t border-indigo-500/30 pt-6">
                                <h3 className="text-lg font-semibold text-indigo-300 mb-3 flex items-center gap-2">
                                    <span>⭐</span> Interests
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.interests.map((interest, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 rounded-full text-sm font-medium border"
                                            style={{
                                                background: 'rgba(0,240,255,0.1)',
                                                borderColor: 'rgba(0,240,255,0.3)',
                                                color: '#00F0FF',
                                                boxShadow: '0 0 10px rgba(0,240,255,0.2)'
                                            }}
                                        >
                                            #{interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <a
                        href="/discover"
                        className="p-6 bg-black/50 backdrop-blur-lg border-2 border-indigo-500/30 rounded-xl hover:border-cyan-500/50 transition-all duration-300 text-center group"
                    >
                        <div className="text-4xl mb-2">🔍</div>
                        <div className="font-semibold text-cyan-400 group-hover:text-cyan-300">Discover</div>
                        <div className="text-sm text-gray-400 mt-1">Find new connections</div>
                    </a>

                    <a
                        href="/chatRoom"
                        className="p-6 bg-black/50 backdrop-blur-lg border-2 border-indigo-500/30 rounded-xl hover:border-pink-500/50 transition-all duration-300 text-center group"
                    >
                        <div className="text-4xl mb-2">💬</div>
                        <div className="font-semibold text-pink-400 group-hover:text-pink-300">Messages</div>
                        <div className="text-sm text-gray-400 mt-1">Your conversations</div>
                    </a>

                    <a
                        href="/consultantDashboard"
                        className="p-6 bg-black/50 backdrop-blur-lg border-2 border-indigo-500/30 rounded-xl hover:border-purple-500/50 transition-all duration-300 text-center group"
                    >
                        <div className="text-4xl mb-2">👥</div>
                        <div className="font-semibold text-purple-400 group-hover:text-purple-300">Consultants</div>
                        <div className="text-sm text-gray-400 mt-1">Get expert advice</div>
                    </a>
                </div>

                {/* Logout Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={handleLogout}
                        className="px-8 py-3 bg-red-600/80 hover:bg-red-700/90 text-white font-bold rounded-lg shadow-lg transition-all duration-200"
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
