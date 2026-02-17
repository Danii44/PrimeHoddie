'use client';

import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useStore();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (user?.role !== 'admin') {
        // Not an admin? Send them home
        router.push('/');
      } else {
        setAuthorized(true);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !authorized) {
    return (
      <div className="h-screen bg-[#0B0C0F] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#7B2FF7]"></div>
      </div>
    );
  }

  return <>{children}</>;
}