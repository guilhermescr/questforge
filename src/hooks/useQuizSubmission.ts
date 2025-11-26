import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/src/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { QuestionState } from './useQuizAnswers';
import { QuestionDTO } from '../types/question.dto';

interface UseQuizSubmissionProps {
  quizId: string;
  questions: QuestionDTO[];
  questionStates: Record<string, QuestionState>;
  setQuestionStates: React.Dispatch<
    React.SetStateAction<Record<string, QuestionState>>
  >;
}

export default function useQuizSubmission({
  quizId,
  questions,
  questionStates,
  setQuestionStates,
}: UseQuizSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitQuiz = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const respondentId = uuidv4();
    const updatedQuestionStates = { ...questionStates };

    const answers = questions.reduce((acc, q) => {
      const state = updatedQuestionStates[q.id];

      if (!state || !state.isAnswered) return acc;

      let isCorrect = state.isCorrect ?? false;

      if (!state.isChecked) {
        isCorrect =
          q.type === 'multiple-choice' || q.type === 'true-false'
            ? state.userAnswer?.toLowerCase() === q.correctAnswer?.toLowerCase()
            : q.type === 'open-ended'
            ? state.userAnswer?.trim().toLowerCase() ===
              q.correctAnswer?.trim().toLowerCase()
            : false;

        updatedQuestionStates[q.id] = {
          ...state,
          isChecked: true,
          isCorrect,
        };
      }

      acc[q.id] = {
        userAnswer: state.userAnswer ?? null,
        isCorrect,
      };

      return acc;
    }, {} as Record<string, { userAnswer: string | null; isCorrect: boolean }>);

    setQuestionStates(updatedQuestionStates);

    const total = questions.length;
    const correctCount = Object.values(updatedQuestionStates).filter(
      (s) => s.isCorrect
    ).length;

    const score = correctCount / total;

    try {
      const { error: responseError } = await supabase.from('responses').insert({
        quiz_id: quizId,
        respondent_id: respondentId,
        answers,
        score,
      });

      if (responseError) throw responseError;

      const { error: rpcError } = await supabase.rpc(
        'increment_quiz_attempts',
        {
          quiz_id_input: quizId,
        }
      );

      if (rpcError) throw rpcError;

      const { error: quizStatsError } = await supabase.rpc(
        'update_quiz_stats',
        {
          quiz_id_input: quizId,
          new_score: score,
        }
      );

      if (quizStatsError) throw quizStatsError;

      setIsSubmitted(true);
      toast.success('Quiz submitted successfully!');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting quiz:', err);
      toast.error('Failed to submit quiz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    isSubmitted,
    submitQuiz,
    setIsSubmitted,
  };
}
