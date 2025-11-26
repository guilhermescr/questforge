'use client';

import Input from '@/src/components/input/Input';
import { QuestionLabel } from '@/src/components/quizForm/QuizQuestion';
import { Button } from '@/src/components/ui/Button';
import { QuestionDTO } from '@/src/types/question.dto';
import { Check } from 'lucide-react';
import AnswerRadioButton from './AnswerRadioButton';
import { AnswerCheckingMode } from '@/src/types/quiz.dto';
import QuestionFeedbackMessage from './QuestionFeedbackMessage';

interface QuestionCardProps {
  checkingMode: AnswerCheckingMode;
  question: QuestionDTO;
  index: number;
  state: {
    userAnswer: string | null;
    isAnswered?: boolean;
    isChecked?: boolean;
    isCorrect?: boolean;
  };
  onAnswer: (isAnswered: boolean, userAnswer: string | null) => void;
  onCheckAnswer: (isCorrect: boolean) => void;
  isSubmitted: boolean;
}

export default function QuestionCard({
  checkingMode,
  question,
  index,
  state,
  onAnswer,
  onCheckAnswer,
  isSubmitted,
}: QuestionCardProps) {
  const selectedOption = state.userAnswer ?? null;
  const openEndedAnswer = state.userAnswer ?? '';

  const handleOptionSelect = (option: string) => {
    onAnswer(true, option);
  };

  const handleOpenEndedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (value.trim() !== '') {
      onAnswer(true, value);
    } else {
      onAnswer(false, null);
    }
  };

  const handleCheck = () => {
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      onCheckAnswer(
        selectedOption?.toLowerCase() === question.correctAnswer?.toLowerCase()
      );
    } else if (question.type === 'open-ended') {
      onCheckAnswer(
        openEndedAnswer.trim().toLowerCase() ===
          question.correctAnswer.toLowerCase()
      );
    }
  };

  return (
    <div>
      <section className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow-sm border-border">
        <h2 className="font-semibold text-lg">Question {index + 1}</h2>

        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {question.prompt}
        </p>

        {question.type === 'multiple-choice' && (
          <div className="flex flex-col gap-3">
            {question.options.map((option, idx) => (
              <AnswerRadioButton
                key={idx}
                id={`question-${index}-option-${idx}`}
                name={`question-${index}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}
                label={`${String.fromCharCode(65 + idx)}.`}
                disabled={isSubmitted || (state.isChecked ?? false)}
                isChecked={state.isChecked}
                isCorrect={state.isCorrect}
              />
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="flex flex-col gap-3">
            {['True', 'False'].map((option, idx) => (
              <AnswerRadioButton
                key={idx}
                id={`question-${index}-true-false-${idx}`}
                name={`question-${index}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}
                label=""
                disabled={isSubmitted || (state.isChecked ?? false)}
                isChecked={state.isChecked}
                isCorrect={state.isCorrect}
              />
            ))}
          </div>
        )}

        {question.type === 'open-ended' && (
          <div className="flex flex-col">
            <QuestionLabel
              index={index}
              htmlFor={`question-${index}-open-ended`}
              text="Your Answer"
              className="text-sm"
            />

            <Input
              id={`question-${index}-open-ended`}
              placeholder="Enter your answer..."
              value={openEndedAnswer}
              onChange={handleOpenEndedChange}
              disabled={isSubmitted || (state.isChecked ?? false)}
              state={{
                isChecked: state.isChecked,
                isCorrect: state.isCorrect,
              }}
            />
          </div>
        )}

        {state.isChecked && (
          <QuestionFeedbackMessage
            isCorrect={state.isCorrect ?? false}
            correctAnswer={question.correctAnswer}
            explanation={question.explanation}
          />
        )}
      </section>

      {checkingMode === 'immediate' && (
        <Button
          className="mt-3"
          onClick={handleCheck}
          disabled={!state.isAnswered || state.isChecked}
        >
          <Check size={18} /> {state.isChecked ? 'Checked' : 'Check Answer'}
        </Button>
      )}
    </div>
  );
}
