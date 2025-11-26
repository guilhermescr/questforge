'use client';

import QuizForm from '@/src/components/quizForm/QuizForm';
import { QuizFormType } from '@/src/components/quizForm/quizForm.schema';
import { supabase } from '@/src/lib/supabaseClient';
import { toast } from 'sonner';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import Loading from '@/src/components/loading/Loading';
import routes from '@/src/lib/routes';
import { useUserContext } from '@/src/context/UserContext';
import { useQuiz } from '@/src/hooks/useQuiz';

export default function EditQuizPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { user } = useUserContext();

  const { quiz, loading, notFound } = useQuiz(slug as string, user?.id);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: QuizFormType) => {
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('quizzes')
        .update({
          title: data.title,
          answer_checking_mode: data.answer_checking_mode,
          questions: data.questions,
        })
        .eq('id', slug);

      if (error) {
        console.error('Error updating quiz:', error);
        toast.error('Failed to update quiz.');
      } else {
        toast.success('Quiz updated successfully!');

        if (slug) {
          router.push(routes.quiz.view(slug as string));
        }
      }
    } catch (err) {
      console.error('Unexpected error updating quiz:', err);
      toast.error('An unexpected error occurred while updating the quiz.');
    } finally {
      setIsSaving(false);
    }
  };

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-white text-4xl font-bold mb-3">Quiz Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The quiz you are looking for does not exist.
        </p>

        <Button asChild>
          <Link href={routes.dashboard}>
            <MoveLeft /> Go Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  if (loading || !quiz) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <h2 className="text-white text-4xl font-bold mb-3">Edit Quiz</h2>
        <p className="text-muted-foreground">
          Modify your quiz questions and settings
        </p>
      </header>

      <QuizForm
        initialValues={{
          title: quiz.title,
          answer_checking_mode: quiz.answer_checking_mode,
          questions: quiz.questions,
        }}
        onSubmit={handleSubmit}
        submitButtonText="Update Quiz"
        loading={isSaving}
      />
    </>
  );
}
