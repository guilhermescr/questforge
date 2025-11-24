'use client';

import QuizForm from '@/src/components/quizForm/QuizForm';
import { QuizFormType } from '@/src/components/quizForm/quizForm.schema';
import { toast } from 'sonner';

export default function EditQuizPage() {
  const initialValues: QuizFormType = {
    title: 'Sample Quiz',
    answerCheckingMode: 'on-completion',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        prompt: 'What is 2 + 2?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '4',
        explanation: '2 + 2 equals 4.',
      },
    ],
  };

  const handleSubmit = (data: QuizFormType) => {
    console.log('Updated Quiz Data:', data);
    toast.success('Quiz updated successfully!');
  };

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
