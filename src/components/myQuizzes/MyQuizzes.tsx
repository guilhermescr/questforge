'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { QuizDTO } from '@/src/types/quiz.dto';
import QuizCard from './QuizCard';
import routes from '@/src/lib/routes';
import { supabase } from '@/src/lib/supabaseClient';
import Loading from '../loading/Loading';
import { useUserContext } from '@/src/context/UserContext';

export default function MyQuizzes() {
  const { user } = useUserContext();
  const [quizzes, setQuizzes] = useState<QuizDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user || hasFetched.current) return;

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('quizzes')
          .select(
            'id, title, questions, answer_checking_mode, attempts, created_at, created_by'
          )
          .eq('created_by', user.id);

        if (error) {
          console.error('Error fetching quizzes:', error);
        } else {
          const formattedQuizzes = data.map((quiz) => ({
            id: quiz.id,
            title: quiz.title,
            questions: quiz.questions,
            answerChecking: quiz.answer_checking_mode,
            attempts: quiz.attempts || 0,
            created_at: quiz.created_at,
            created_by: quiz.created_by,
          }));
          setQuizzes(formattedQuizzes);
        }
      } catch (err) {
        console.error('Unexpected error fetching quizzes:', err);
      } finally {
        setLoading(false);
        hasFetched.current = true;
      }
    };

    fetchQuizzes();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (!quizzes.length) {
    return (
      <section className="border border-dashed border-border rounded-md flex flex-col items-center justify-center p-8 mt-6">
        <h3 className="font-semibold text-xl text-white">No quizzes yet</h3>
        <p className="text-center text-muted-foreground mt-2">
          Get started by creating your first quiz!
        </p>

        <Button className="mt-5" asChild>
          <Link href={routes.quiz.new}>Create Your First Quiz</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          onDelete={(quizId) =>
            setQuizzes((prev) => prev.filter((q) => q.id !== quizId))
          }
        />
      ))}
    </section>
  );
}
