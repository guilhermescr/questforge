'use client';

import { toast } from 'sonner';
import QuizForm from '@/src/components/quizForm/QuizForm';
import { QuizFormType } from '@/src/components/quizForm/quizForm.schema';

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

  const handleSubmit = (data: QuizFormType) => {
    console.log('Form Data:', data);
    toast.success('Quiz created successfully!');
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
