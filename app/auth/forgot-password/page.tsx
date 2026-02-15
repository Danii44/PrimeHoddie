'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSent(true);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#12131A]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="text-2xl font-black text-white mb-6 block">
              PRIME<span className="text-[#7B2FF7]">HODDIE</span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isSent ? 'Check Your Email' : 'Reset Your Password'}
            </h1>
            <p className="text-[#A6ACB8] text-sm">
              {isSent
                ? 'We sent a password reset link to your email address'
                : 'Enter your email address and we will send you a link to reset your password'}
            </p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm text-white mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A6ACB8]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="prime-input pl-12"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full prime-btn-primary py-6 disabled:opacity-50 mt-6"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#7B2FF7]/20 flex items-center justify-center">
                <Mail className="w-8 h-8 text-[#7B2FF7]" />
              </div>
              <p className="text-white mb-4">
                Follow the link in your email to reset your password. It may take a few minutes to arrive.
              </p>
              <Button
                onClick={() => setIsSent(false)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Send Another Email
              </Button>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-2 text-sm text-[#A6ACB8] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
