'use client';

import Wrapper from '@/src/components/wrapper/Wrapper';
import { answerCheckingModeLabels } from '@/src/types/quiz.dto';
import { useParams } from 'next/navigation';
import { useUserContext } from '@/src/context/UserContext';
import Link from 'next/link';
import routes from '@/src/lib/routes';
import QuizResults from './QuizResults';
import QuestionCard from './QuestionCard';
import Loading from '@/src/components/loading/Loading';
import useQuizAnswers from '@/src/hooks/useQuizAnswers';
import useQuizSubmission from '@/src/hooks/useQuizSubmission';
import QuizHeader from '@/src/components/quizAnswer/QuizHeader';
import QuizSubmission from '@/src/components/quizAnswer/QuizSubmission';
import { useQuiz } from '@/src/hooks/useQuiz';
import { Button } from '@/src/components/ui/Button';
import { MoveLeft } from 'lucide-react';
import { useEffect } from 'react';

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

export default function AnswerQuizPage() {
  const { slug } = useParams();
  const { user } = useUserContext();

  const { quiz, loading, notFound } = useQuiz(slug as string);

  const {
    questionStates,
    handleAnswer,
    handleCheckAnswer,
    remainingQuestions,
    resetAnswers,
    setQuestionStates,
  } = useQuizAnswers(quiz?.questions || []);

  const { isSubmitting, isSubmitted, submitQuiz, setIsSubmitted } =
    useQuizSubmission({
      quizId: quiz?.id || '',
      questions: quiz?.questions || [],
      questionStates,
      setQuestionStates,
    });

  const handleRetake = () => {
    resetAnswers();
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (quiz && !isSubmitted) {
      const allAnswered = quiz.questions.every(
        (q) =>
          questionStates[q.id]?.isAnswered && questionStates[q.id]?.isChecked
      );

      if (allAnswered) {
        submitQuiz();
      }
    }
  }, [quiz, questionStates, submitQuiz, isSubmitted]);

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
        <Link href={routes.dashboard}>Go Back to Dashboard</Link>
      </Wrapper>
    );
  }

  const totalQuestions = quiz.questions.length;
  const correctAnswers = Object.values(questionStates).filter(
    (state) => state.isCorrect
  ).length;
  const correctPercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const feedbackMessage = getFeedbackMessage(correctAnswers, totalQuestions);

  const progressPercentage =
    (Object.values(questionStates).filter((state) => state.isAnswered).length /
      quiz.questions.length) *
    100;

  return (
    <Wrapper className="max-w-2xl flex flex-col justify-center items-center">
      {user && quiz && quiz.created_by === user.id && (
        <Button className="self-start mb-4" variant="outline" asChild>
          <Link href={routes.quiz.view(quiz.id)}>
            <MoveLeft className="mr-2" />
            Back to Analytics
          </Link>
        </Button>
      )}

      {!isSubmitted ? (
        <QuizHeader
          title={quiz.title}
          totalQuestions={totalQuestions}
          progressPercentage={progressPercentage}
          answeredCount={
            Object.values(questionStates).filter((state) => state.isAnswered)
              .length
          }
          answerCheckingModeLabel={
            answerCheckingModeLabels[quiz.answer_checking_mode]
          }
        />
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

      <form className="w-full mt-6 flex flex-col gap-6">
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
          <QuizSubmission
            isSubmitting={isSubmitting}
            remainingQuestionsCount={remainingQuestions.length}
            onSubmit={submitQuiz}
          />
        )}
      </form>
    </Wrapper>
  );
}
