// 'use client';

// import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Hero from '@/components/main/home/Hero';

export default function Home() {
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   const token = searchParams.get('token');
  //   if (token) {
  //     localStorage.setItem('anilist_token', token);
  //     window.history.replaceState({}, '', '/');
  //   }
  // }, [searchParams]);

  return (
    <>
      <main className="min-h-screen">
        <Hero />
    </main>
    </>
  );
}