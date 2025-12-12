// src/app/login/LoginForm.jsx

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
// استيراد Server Action للدخول
import { signIn } from '@/services/auth';

const SubmitButton = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 mt-6 font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            style={{
                background: 'linear-gradient(90deg, #00F0FF, #FF00C8)',
                color: '#0A0A0A',
                boxShadow: pending ? 'none' : '0 0 15px rgba(0, 240, 255, 0.4)'
            }}
        >
            {pending ? 'Processing...' : children}
        </button>
    );
};

export default function LoginForm() {
    const [error, setError] = useState('');

    const handleSignIn = async (formData) => {
        setError(''); // مسح الأخطاء السابقة
        const result = await signIn(formData);
        
        if (result?.error) {
            setError(result.error);
        }
        // في حال النجاح، سيقوم Server Action بإعادة التوجيه (redirect) تلقائيًا
    };

    // تصميم Glassmorphism
    const glassStyle = {
        background: 'rgba(10, 10, 10, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    };

    return (
        <div 
            className="p-8 rounded-xl text-white max-w-sm w-full mx-auto animate-fadeIn"
            style={glassStyle}
        >
            <h2 className="text-3xl font-bold text-center mb-6 text-cyan-300">
                Sign In
            </h2>
            
            <form action={handleSignIn}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-indigo-500/50 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 outline-none transition-colors"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-indigo-500/50 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 outline-none transition-colors"
                    />
                </div>

                {error && (
                    <p className="text-red-400 text-sm mb-4 text-center p-2 rounded-md bg-red-900/30 border border-red-500/40">
                        {error}
                    </p>
                )}

                <SubmitButton>Sign In to VEXACHAT</SubmitButton>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="text-cyan-400 hover:text-pink-400 transition-colors font-medium">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}