// src/app/signup/SignupForm.jsx

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
// استيراد Server Action للتسجيل
import { signUp } from '@/services/auth';

const SubmitButton = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 mt-6 font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            style={{
                background: 'linear-gradient(90deg, #FF00C8, #00F0FF)',
                color: '#0A0A0A',
                boxShadow: pending ? 'none' : '0 0 15px rgba(255, 0, 200, 0.4)'
            }}
        >
            {pending ? 'Processing...' : children}
        </button>
    );
};

export default function SignupForm() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignUp = async (formData) => {
        setError('');
        setSuccess(false);

        // التحقق من تطابق كلمات المرور (يتم التعامل معها هنا في جانب العميل قبل إرسال Server Action)
        if (formData.get('password') !== formData.get('confirmPassword')) {
            return setError("Passwords do not match.");
        }

        const result = await signUp(formData);
        
        if (result?.error) {
            setError(result.error);
        } else if (result?.success) {
            setSuccess(true);
        }
    };

    // تصميم Glassmorphism
    const glassStyle = {
        background: 'rgba(10, 10, 10, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 0, 200, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    };

    if (success) {
        return (
            <div 
                className="p-10 rounded-xl text-white max-w-sm w-full mx-auto text-center"
                style={glassStyle}
            >
                <p className="text-4xl mb-4">📧</p>
                <h2 className="text-2xl font-bold text-green-400 mb-3">
                    Confirmation Sent!
                </h2>
                <p className="text-gray-300 mb-6">
                    Please check your email inbox to confirm your account and complete the registration.
                </p>
                <Link href="/login" className="text-cyan-400 hover:text-pink-400 transition-colors font-medium text-sm">
                    Go back to Sign In
                </Link>
            </div>
        );
    }

    return (
        <div 
            className="p-8 rounded-xl text-white max-w-sm w-full mx-auto animate-fadeIn"
            style={glassStyle}
        >
            <h2 className="text-3xl font-bold text-center mb-6 text-pink-300">
                Create Account
            </h2>
            
            <form action={handleSignUp}>
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

                <div className="mb-4">
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
                
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
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

                <SubmitButton>Create VEXACHAT Account</SubmitButton>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-pink-400 hover:text-cyan-400 transition-colors font-medium">
                    Sign In
                </Link>
            </div>
        </div>
    );
}