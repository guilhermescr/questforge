'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../hooks/useUser';
import Header from '../components/header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      router.push('/auth');
    }
  }, [user, router]);

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  if (user === null) {
    return null;
  }

  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
