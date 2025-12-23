"use client";

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/services/auth';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    birthDate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Age verification
    const age = calculateAge(formData.birthDate);
    if (age < 18) {
      setError('You must be 18 years or older to join this platform.');
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        router.push('/verify-email');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Join VeXaChat</h1>
        <p className="text-gray-400 text-center mb-8">For adults 18+ only</p>

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Birth Date for Age Verification */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              required
              value={formData.birthDate}
              onChange={(e) => {
                setFormData({ ...formData, birthDate: e.target.value });
                const age = calculateAge(e.target.value);
                setAgeVerified(age >= 18);
              }}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
            />
            {formData.birthDate && (
              <p className={`mt-2 text-sm ${ageVerified ? 'text-green-400' : 'text-red-400'}`}>
                {ageVerified ? '✓ Age verified (18+)' : '✗ Must be 18+'}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password *
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              type="checkbox"
              required
              id="terms"
              className="mt-1 mr-3"
            />
            <label htmlFor="terms" className="text-sm text-gray-300">
              I confirm that I am 18 years or older and agree to the{' '}
              <a href="/terms" className="text-purple-400 hover:underline">Terms</a> and{' '}
              <a href="/privacy" className="text-purple-400 hover:underline">Privacy Policy</a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !ageVerified}
            className={`w-full py-3 rounded-lg font-bold transition ${
              loading || !ageVerified
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-purple-400 hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
