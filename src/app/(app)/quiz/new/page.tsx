'use client';

import { toast } from 'sonner';
import QuizForm from '@/src/components/quizForm/QuizForm';
import { QuizFormType } from '@/src/components/quizForm/quizForm.schema';
import { supabase } from '@/src/lib/supabaseClient';

export default function NewQuizPage() {
  const initialValues: QuizFormType = {
    title: '',
    answerCheckingMode: 'immediate',
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
    const { error } = await supabase.from('quizzes').insert([
      {
        title: data.title,
        answer_checking_mode: data.answerCheckingMode,
        questions: data.questions,
      },
    ]);

    if (error) {
      console.error('Error creating quiz:', error);
      toast.error('Failed to create quiz.');
    } else {
      toast.success('Quiz created successfully!');
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
        submitButtonText="Save Quiz"
      />
    </>
  );
}
