'use client';

import Input from '@/src/components/input/Input';
import { QuestionLabel } from '@/src/components/quizForm/QuizQuestion';
import { Button } from '@/src/components/ui/Button';
import { QuestionDTO } from '@/src/types/question.dto';
import { Check } from 'lucide-react';
import { useState } from 'react';
import AnswerRadioButton from './AnswerRadioButton';

function FeedbackMessage({
  isCorrect,
  correctAnswer,
  explanation,
}: {
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
}) {
  return (
    <div
      className={`p-4 rounded-lg ${
        isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
      }`}
    >
      <p
        className={`mb-2 font-semibold ${
          isCorrect ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isCorrect ? 'Correct!' : 'Incorrect'}
      </p>

      {!isCorrect && (
        <p className="mb-2 text-sm text-muted-foreground">
          Correct answer: {correctAnswer}
        </p>
      )}

      {explanation && <p className="text-sm text-foreground">{explanation}</p>}
    </div>
  );
}

interface QuestionCardProps {
  question: QuestionDTO;
  index: number;
  state: {
    isAnswered?: boolean;
    isChecked?: boolean;
    isCorrect?: boolean;
  };
  onAnswer: (isAnswered: boolean) => void;
  onCheckAnswer: (isCorrect: boolean) => void;
}

export default function QuestionCard({
  question,
  index,
  state,
  onAnswer,
  onCheckAnswer,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [openEndedAnswer, setOpenEndedAnswer] = useState<string>('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onAnswer(true);
  };

  const handleOpenEndedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setOpenEndedAnswer(value);

    if (value.trim() !== '') {
      onAnswer(true);
    } else {
      onAnswer(false);
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
                disabled={state.isChecked ?? false}
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
                disabled={state.isChecked ?? false}
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
              disabled={state.isChecked}
              state={{
                isChecked: state.isChecked,
                isCorrect: state.isCorrect,
              }}
            />
          </div>
        )}

        {state.isChecked && (
          <FeedbackMessage
            isCorrect={state.isCorrect ?? false}
            correctAnswer={question.correctAnswer}
            explanation={question.explanation}
          />
        )}
      </section>

      <Button className="mt-3" onClick={handleCheck} disabled={state.isChecked}>
        <Check size={18} /> {state.isChecked ? 'Checked' : 'Check Answer'}
      </Button>
    </div>
  );
}
