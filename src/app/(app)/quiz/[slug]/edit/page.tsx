'use client';

import QuizForm from '@/src/components/quizForm/QuizForm';
import { QuizFormType } from '@/src/components/quizForm/quizForm.schema';
import { supabase } from '@/src/lib/supabaseClient';
import { toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import Loading from '@/src/components/loading/Loading';

export default function EditQuizPage() {
  const { slug } = useParams();
  const [initialValues, setInitialValues] = useState<QuizFormType | null>(null);
  const [notFound, setNotFound] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!slug || hasFetched.current) return;

    const fetchQuiz = async () => {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', slug)
        .single();

      if (error || !data) {
        console.error('Error fetching quiz:', error);
        setNotFound(true);
        toast.error('Quiz not found.');
      } else {
        setInitialValues({
          title: data.title,
          answerCheckingMode: data.answer_checking_mode,
          questions: data.questions,
        });
      }
    };

    fetchQuiz();
    hasFetched.current = true;
  }, [slug]);

  const handleSubmit = async (data: QuizFormType) => {
    const { error } = await supabase
      .from('quizzes')
      .update({
        title: data.title,
        answer_checking_mode: data.answerCheckingMode,
        questions: data.questions,
      })
      .eq('id', slug);

    if (error) {
      console.error('Error updating quiz:', error);
      toast.error('Failed to update quiz.');
    } else {
      toast.success('Quiz updated successfully!');
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
          <Link href="/dashboard">
            <MoveLeft /> Go Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  if (!initialValues) {
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
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitButtonText="Update Quiz"
      />
    </>
  );
}
