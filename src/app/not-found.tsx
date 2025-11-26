'use client';

import Link from 'next/link';
import GradientText from '../components/gradientText/GradientText';
import routes from '../lib/routes';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="font-bold">
          <GradientText className="text-4xl">QuestForge</GradientText>
        </h1>

        <p className="text-muted-foreground text-lg font-medium mt-3">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          It might have been moved or the URL might be incorrect.
        </p>

        <Button className="mt-6 w-full" asChild>
          <Link href={routes.dashboard}>
            <Home size={16} />
            Go Back Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
