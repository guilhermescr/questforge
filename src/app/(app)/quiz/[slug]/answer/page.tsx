'use client';

import Wrapper from '@/src/components/wrapper/Wrapper';
import { answerCheckingModeLabels, QuizDTO } from '@/src/types/quiz.dto';
import { useState } from 'react';
import QuestionCard from './QuestionCard';

export default function AnswerQuizPage() {
  const [questionStates, setQuestionStates] = useState<
    Record<
      string,
      {
        isAnswered: boolean;
        isChecked: boolean;
        isCorrect?: boolean;
      }
    >
  >({});

  const quiz: QuizDTO = {
    id: 'mixed-quiz',
    title: 'Mixed Question Types Quiz',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        prompt: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid', 'Rome'],
        correctAnswer: 'Paris',
        explanation: 'Paris is the capital city of France.',
      },
      {
        id: 'q2',
        type: 'true-false',
        prompt: 'The Earth is flat.',
        options: ['True', 'False'],
        correctAnswer: 'false',
        explanation: 'The Earth is an oblate spheroid, not flat.',
      },
      {
        id: 'q3',
        type: 'open-ended',
        prompt: 'Name a programming language that starts with "P".',
        options: [],
        correctAnswer: 'Python',
        explanation: 'Python is a popular programming language.',
      },
    ],
    answerChecking: 'immediate',
    attempts: 2,
    created_at: new Date().toISOString(),
    created_by: 'anonymous',
  };

  const handleAnswer = (questionId: string, isAnswered: boolean) => {
    setQuestionStates((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        isAnswered,
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

  const progressPercentage =
    (Object.values(questionStates).filter((state) => state.isAnswered).length /
      quiz.questions.length) *
    100;

  return (
    <Wrapper className="max-w-2xl flex flex-col justify-center items-center min-h-screen">
      <header className="flex flex-col gap-2 justify-between w-full">
        <h1 className="text-white text-4xl font-bold">{quiz.title}</h1>
        <p className="text-muted-foreground">
          {quiz.questions.length} questions &bull;{' '}
          {answerCheckingModeLabels[quiz.answerChecking]}
        </p>

        <div>
          <div className="flex items-center justify-between text-muted-foreground text-sm my-2">
            <span>Progress</span>
            <span>
              {
                Object.values(questionStates).filter(
                  (state) => state.isAnswered
                ).length
              }{' '}
              / {quiz.questions.length}
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-primary/20">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </header>

      <form className="w-full mt-6 flex flex-col gap-6">
        {quiz.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            state={questionStates[question.id] || {}}
            onAnswer={(isAnswered) => handleAnswer(question.id, isAnswered)}
            onCheckAnswer={(isCorrect) =>
              handleCheckAnswer(question.id, isCorrect)
            }
          />
        ))}
      </form>
    </Wrapper>
  );
}
