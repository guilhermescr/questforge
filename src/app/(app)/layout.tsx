'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Header from '../../components/header/Header';
import Wrapper from '@/src/components/wrapper/Wrapper';
import routes, { publicRoutes } from '@/src/lib/routes';
import { useUserContext } from '@/src/context/UserContext';
import Loading from '@/src/components/loading/Loading';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = (path: string) => {
    return publicRoutes.some((route) => {
      const routeSegments = route.split('/');
      const pathSegments = path.split('/');

      if (routeSegments.length !== pathSegments.length) {
        return false;
      }

      return routeSegments.every((segment, index) => {
        return segment === pathSegments[index] || segment === '[slug]';
      });
    });
  };

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (!isPublicRoute(pathname) && user === null) {
      router.push(routes.auth);
    }
  }, [user, router, pathname]);

  if (user === undefined) {
    return <Loading height="min-h-screen" />;
  }

  if (user === null && !isPublicRoute(pathname)) {
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
