import { useState } from 'react';
import { QuestionDTO } from '../types/question.dto';

export interface QuestionState {
  userAnswer: string | null;
  isAnswered: boolean;
  isChecked: boolean;
  isCorrect?: boolean;
}

export default function useQuizAnswers(questions: QuestionDTO[]) {
  const [questionStates, setQuestionStates] = useState<
    Record<string, QuestionState>
  >({});

  const handleAnswer = (
    questionId: string,
    isAnswered: boolean,
    userAnswer: string | null
  ) => {
    setQuestionStates((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        isAnswered,
        userAnswer,
        isChecked: prev[questionId]?.isChecked || false,
      },
    }));
  };

  const handleCheckAnswer = (questionId: string, isCorrect: boolean) => {
    setQuestionStates((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        isChecked: true,
        isCorrect,
      },
    }));
  };

  const resetAnswers = () => {
    setQuestionStates({});
  };

  const remainingQuestions = questions.filter(
    (q) => !questionStates[q.id]?.isAnswered
  );

  return {
    questionStates,
    setQuestionStates,
    handleAnswer,
    handleCheckAnswer,
    remainingQuestions,
    resetAnswers,
  };
}
