'use client';

import MyQuizzes from '@/src/components/myQuizzes/MyQuizzes';
import { Button } from '@/src/components/ui/Button';
import routes from '@/src/lib/routes';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-4xl font-bold mb-3">My Quizzes</h2>
          <p className="text-muted-foreground">
            Create, manage, and share your quizzes
          </p>
        </div>

        <Link href={routes.quiz.new}>
          <Button>
            <Plus size={18} className="mr-2" /> Create Quiz
          </Button>
        </Link>
      </header>

      <MyQuizzes />
    </>
  );
}
