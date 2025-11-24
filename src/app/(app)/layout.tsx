'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/header/Header';
import Wrapper from '@/src/components/wrapper/Wrapper';
import routes from '@/src/lib/routes';
import { useUserContext } from '@/src/context/UserContext';
import Loading from '@/src/components/loading/Loading';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      router.push(routes.auth);
    }
  }, [user, router]);

  if (user === undefined) {
    return <Loading height="min-h-screen" />;
  }

  if (user === null) {
    return null;
  }

  return (
    <>
      <Header />
      <Wrapper>
        <main className="py-8">{children}</main>
      </Wrapper>
    </>
  );
}
