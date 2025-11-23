'use client';

import { useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation';
import GradientText from '../components/gradientText/GradientText';

function WhiteGoogleSVG() {
  return (
    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      ></path>
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      ></path>
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      ></path>
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      ></path>
    </svg>
  );
}

export default function AuthPage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) return;

    router.push('/dashboard');
  }, [user, router]);

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1>
            <GradientText className="text-5xl font-bold">
              QuestForge
            </GradientText>
          </h1>

          <p className="text-muted-foreground text-lg font-medium mt-3">
            Create and share engaging quizzes
          </p>
        </div>

        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border">
          <div className="px-6">
            <h2 className="font-semibold text-2xl mb-2">Welcome back</h2>
            <p className="text-muted-foreground text-sm">
              Sign in to access your quizzes and create new ones
            </p>
          </div>

          <div className="px-6">
            <button
              type="button"
              className="cursor-pointer flex items-center justify-center gap-2 text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-10 rounded-md px-6 w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={signInWithGoogle}
            >
              <WhiteGoogleSVG />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
