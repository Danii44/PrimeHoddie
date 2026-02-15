'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || '',
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Verify admin status
      const idTokenResult = await userCredential.user.getIdTokenResult();
      if (idTokenResult.claims.admin === true) {
        toast.success('Admin login successful!');
        router.push('/admin/dashboard');
      } else {
        toast.error('Not authorized as admin');
        await auth.signOut();
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#12131A]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="mb-8">
            <Link href="/" className="text-2xl font-black text-white mb-6 block">
              PRIME<span className="text-[#7B2FF7]">HODDIE</span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-[#A6ACB8] text-sm">Sign in with admin credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A6ACB8]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@primehoddie.com"
                  className="prime-input pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A6ACB8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="prime-input pl-12 pr-12"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A6ACB8] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full prime-btn-primary py-6 disabled:opacity-50 mt-6"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In to Admin'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <Link href="/" className="text-center block text-sm text-[#A6ACB8] hover:text-white transition-colors">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
