import QuizQuestion from './QuizQuestion';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { QuizFormType } from './quizForm.schema';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface QuestionCarouselProps {
  questions: QuizFormType['questions'];
  register: UseFormRegister<QuizFormType>;
  setValue: UseFormSetValue<QuizFormType>;
  errors?: FieldErrors<QuizFormType>;
}

export default function QuestionCarousel({
  questions,
  register,
  setValue,
  errors,
}: QuestionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const addQuestion = () => {
    const newQuestion: QuizFormType['questions'][number] = {
      id: (questions.length + 1).toString(),
      type: 'multiple-choice',
      prompt: '',
      options: ['', '', '', '', ''],
      correctAnswer: '',
      explanation: '',
    };
    setValue('questions', [...questions, newQuestion]);
    setCurrentIndex(questions.length);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setValue('questions', updatedQuestions);
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
  };

  return (
    <div className="space-y-4">
      {questions.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </span>

            <Button
              variant="outline"
              onClick={goToNext}
              disabled={currentIndex === questions.length - 1}
            >
              Next
            </Button>
          </div>

          <QuizQuestion
            index={currentIndex}
            question={questions[currentIndex]}
            onRemove={() => removeQuestion(currentIndex)}
            register={register}
            setValue={setValue}
            errors={errors?.questions?.[currentIndex]}
          />

          <div className="flex justify-end">
            <Button onClick={addQuestion}>Add Question</Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">No questions available.</p>

          <div className="flex justify-end">
            <Button onClick={addQuestion}>Add Question</Button>
          </div>
        </div>
      )}
    </div>
  );
}
