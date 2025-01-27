'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import LoginButton from '@/components/main/LoginButton';

export default function Home() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('anilist_token', token);
      // Clean up the URL
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <LoginButton />
    </main>
  );
}