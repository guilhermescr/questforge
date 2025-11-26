'use client';

import Wrapper from '@/src/components/wrapper/Wrapper';
import { answerCheckingModeLabels } from '@/src/types/quiz.dto';
import { useState } from 'react';
import QuestionCard from './QuestionCard';
import { useUserContext } from '@/src/context/UserContext';
import { Button } from '@/src/components/ui/Button';
import { CheckCircle2, Loader2, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import routes from '@/src/lib/routes';
import ProgressBar from '@/src/components/progressBar/ProgressBar';
import { v4 as uuidv4 } from 'uuid';
import QuizResults from './QuizResults';
import { useParams } from 'next/navigation';
import { useQuiz } from '@/src/hooks/useQuiz';
import Loading from '@/src/components/loading/Loading';
import { toast } from 'sonner';
import { supabase } from '@/src/lib/supabaseClient';

export default function AnswerQuizPage() {
  const { slug } = useParams();
  const { user } = useUserContext();

  const { quiz, loading, notFound } = useQuiz(slug as string);
  const [questionStates, setQuestionStates] = useState<
    Record<
      string,
      {
        userAnswer: string | null;
        isAnswered: boolean;
        isChecked: boolean;
        isCorrect?: boolean;
      }
    >
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (loading) {
    return <Loading />;
  }

  if (notFound || !quiz) {
    return (
      <Wrapper className="max-w-2xl flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-white text-4xl font-bold mb-3">Quiz Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The quiz you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/dashboard">
            <MoveLeft className="mr-2" />
            Go Back to Dashboard
          </Link>
        </Button>
      </Wrapper>
    );
  }

  const remainingQuestions = quiz.questions.filter(
    (q) => !questionStates[q.id]?.isAnswered
  );

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
      },
    }));
  };

  const handleCheckAnswer = (questionId: string, isCorrect: boolean) => {
    const updatedQuestionStates = {
      ...questionStates,
      [questionId]: {
        ...questionStates[questionId],
        isChecked: true,
        isCorrect,
      },
    };

    setQuestionStates(updatedQuestionStates);

    const allAnswered = quiz.questions.every(
      (q) =>
        updatedQuestionStates[q.id]?.isAnswered &&
        updatedQuestionStates[q.id]?.isChecked
    );

    if (allAnswered) {
      onSubmit();
    }
  };

  const getFeedbackMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;

    if (percentage === 100) {
      return 'Outstanding! You got everything correct!';
    } else if (percentage >= 80) {
      return 'Great job! You did really well!';
    } else if (percentage >= 50) {
      return 'Good effort! Keep practicing to improve.';
    } else {
      return 'Keep going! Every mistake is a step toward learning.';
    }
  };

  const onSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const respondentId = uuidv4();
    const updatedQuestionStates = { ...questionStates };

    const answers = quiz.questions.reduce((acc, q) => {
      const state = updatedQuestionStates[q.id];

      if (!state || !state.isAnswered) return acc;

      let isCorrect = state.isCorrect ?? false;

      if (!state.isChecked || quiz.answer_checking_mode === 'on-completion') {
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

    const total = quiz.questions.length;
    const correctCount = Object.values(updatedQuestionStates).filter(
      (s) => s.isCorrect
    ).length;

    const score = correctCount / total;

    try {
      const { error: responseError } = await supabase.from('responses').insert({
        quiz_id: quiz.id,
        respondent_id: respondentId,
        answers,
        score,
      });

      if (responseError) throw responseError;

      const { error: rpcError } = await supabase.rpc(
        'increment_quiz_attempts',
        {
          quiz_id_input: quiz.id,
        }
      );

      if (rpcError) throw rpcError;

      const { error: quizStatsError } = await supabase.rpc(
        'update_quiz_stats',
        {
          quiz_id_input: quiz.id,
          new_score: score,
        }
      );

      if (quizStatsError) throw quizStatsError;

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('Quiz submitted successfully!');
    } catch (err) {
      console.error('Error submitting quiz:', err);
      toast.error('Failed to submit quiz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleRetake = () => {
    setQuestionStates({});
    setIsSubmitted(false);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercentage =
    (Object.values(questionStates).filter((state) => state.isAnswered).length /
      quiz.questions.length) *
    100;

  const correctAnswers = Object.values(questionStates).filter(
    (state) => state.isCorrect
  ).length;
  const correctPercentage = Math.round(
    (correctAnswers / quiz.questions.length) * 100
  );

  const totalQuestions = quiz.questions.length;

  const feedbackMessage = getFeedbackMessage(correctAnswers, totalQuestions);

  return (
    <Wrapper className="max-w-2xl flex flex-col justify-center items-center min-h-screen">
      {user && quiz && quiz.created_by === user.id && (
        <Button className="self-start mb-4" variant="outline" asChild>
          <Link href={routes.quiz.view(quiz.id)}>
            <MoveLeft className="mr-2" />
            Back to Analytics
          </Link>
        </Button>
      )}

      {!isSubmitted ? (
        <header className="flex flex-col gap-2 justify-between w-full">
          <h1 className="text-white text-4xl font-bold">{quiz.title}</h1>
          <p className="text-muted-foreground">
            {quiz.questions.length} questions &bull;{' '}
            {answerCheckingModeLabels[quiz.answer_checking_mode]}
          </p>

          <ProgressBar
            progress={progressPercentage}
            label={`Progress (${
              Object.values(questionStates).filter((state) => state.isAnswered)
                .length
            }/${quiz.questions.length})`}
          />
        </header>
      ) : (
        <QuizResults
          quiz={quiz}
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
          progressPercentage={progressPercentage}
          correctPercentage={correctPercentage}
          feedbackMessage={feedbackMessage}
          onRetake={handleRetake}
        />
      )}

      <form className="w-full mt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            checkingMode={quiz.answer_checking_mode}
            question={question}
            index={index}
            state={questionStates[question.id] || {}}
            onAnswer={(isAnswered, userAnswer) =>
              handleAnswer(question.id, isAnswered, userAnswer)
            }
            onCheckAnswer={(isCorrect) =>
              handleCheckAnswer(question.id, isCorrect)
            }
            isSubmitted={isSubmitted}
          />
        ))}

        {!isSubmitted && (
          <div className="border border-border rounded-md p-4 mx-auto flex flex-col items-center gap-2">
            <Button
              className="text-lg py-6 w-full"
              type="submit"
              disabled={remainingQuestions.length > 0 || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 animate-spin" size={16} />
              ) : (
                <CheckCircle2 className="mr-2" size={16} />
              )}
              {isSubmitting
                ? 'Submitting...'
                : remainingQuestions.length === 0
                ? 'Submit Quiz'
                : `Answer ${remainingQuestions.length} more question${
                    remainingQuestions.length !== 1 ? 's' : ''
                  }`}
            </Button>

            {remainingQuestions.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Please answer all questions to submit
              </p>
            )}
          </div>
        )}
      </form>
    </Wrapper>
  );
}
