'use client';

import { toast } from 'sonner';
import QuizForm from '@/src/components/quizForm/QuizForm';
import { QuizFormType } from '@/src/components/quizForm/quizForm.schema';
import { supabase } from '@/src/lib/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import routes from '@/src/lib/routes';
import { useUserContext } from '@/src/context/UserContext';

export default function NewQuizPage() {
  const router = useRouter();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);

  const initialValues: QuizFormType = {
    title: '',
    answer_checking_mode: 'immediate',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        prompt: '',
        options: ['', '', '', '', ''],
        correctAnswer: '',
        explanation: '',
      },
    ],
  };

  const handleSubmit = async (data: QuizFormType) => {
    if (!user) return;

    setLoading(true);

    try {
      const { data: insertedData, error } = await supabase
        .from('quizzes')
        .insert([
          {
            title: data.title,
            answer_checking_mode: data.answer_checking_mode,
            questions: data.questions,
            created_by: user.id,
          },
        ])
        .select('id');

      if (error) {
        console.error('Error creating quiz:', error);
        toast.error('Failed to create quiz.');
      } else {
        toast.success('Quiz created successfully!');
        const quizId = insertedData?.[0]?.id;
        if (quizId) {
          router.push(routes.quiz.view(quizId));
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <h2 className="text-white text-4xl font-bold mb-3">Create Quiz</h2>
        <p className="text-muted-foreground">
          Build your quiz with custom questions and settings
        </p>
      </header>

      <QuizForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitButtonText={'Save Quiz'}
        loading={loading}
      />
    </>
  );
}
