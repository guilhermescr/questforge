import { QuestionType, questionTypeOptions } from '@/src/types/question.dto';
import Select from '../select/Select';
import Input from '../input/Input';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import Textarea from '../textarea/Textarea';
import { QuizFormType } from './quizForm.schema';
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';

interface QuestionLabelProps {
  index: number;
  htmlFor: string;
  text: string;
}

export function QuestionLabel({ index, htmlFor, text }: QuestionLabelProps) {
  return (
    <label className="block mb-1 font-medium" htmlFor={`${htmlFor}-${index}`}>
      {text}
    </label>
  );
}

interface QuizQuestionProps {
  index: number;
  question: QuizFormType['questions'][number];
  onRemove: () => void;
  register: UseFormRegister<QuizFormType>;
  setValue: UseFormSetValue<QuizFormType>;
  errors?: FieldErrors<QuizFormType['questions'][number]>;
}

export default function QuizQuestion({
  index,
  question,
  onRemove,
  register,
  setValue,
  errors,
}: QuizQuestionProps) {
  const watchedQuestion = useWatch({
    name: `questions.${index}`,
  });

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    setValue(`questions.${index}.type`, newType as QuestionType);

    if (newType === 'multiple-choice') {
      setValue(`questions.${index}.options`, ['', '', '', '', '']);
      setValue(`questions.${index}.correctAnswer`, '');
    } else if (newType === 'true-false') {
      setValue(`questions.${index}.options`, []);
      setValue(`questions.${index}.correctAnswer`, 'true');
    } else if (newType === 'open-ended') {
      setValue(`questions.${index}.options`, []);
      setValue(`questions.${index}.correctAnswer`, '');
    }
  };

  const removeOption = (optionIndex: number) => {
    const updatedOptions = question.options?.filter(
      (_, i) => i !== optionIndex
    );
    setValue(`questions.${index}.options`, updatedOptions);
  };

  return (
    <section className="bg-card rounded-md p-6">
      <header className="flex items-center justify-between mb-6">
        <h3 className="text-white text-2xl font-bold">Question {index + 1}</h3>

        <Button variant="destructiveOutline" onClick={onRemove}>
          Remove
        </Button>
      </header>

      <div className="space-y-4">
        <div>
          <QuestionLabel
            index={index}
            htmlFor="question-type"
            text="Question Type"
          />

          <Select
            id={`questions.${index}.type`}
            {...register(`questions.${index}.type`)}
            value={watchedQuestion?.type || ''}
            onChange={handleTypeChange}
            options={questionTypeOptions}
            error={errors?.type}
          />
        </div>

        <div>
          <QuestionLabel
            index={index}
            htmlFor="question-prompt"
            text="Question Prompt"
          />

          <Textarea
            id={`questions.${index}.prompt`}
            {...register(`questions.${index}.prompt`)}
            value={watchedQuestion?.prompt || ''}
            placeholder="Enter your question here..."
            error={errors?.prompt}
          />
        </div>

        {question.type === 'multiple-choice' && (
          <>
            <div>
              <h4 className="mb-1 font-medium">Answer Options</h4>

              <div className="space-y-4 mt-2">
                {question.options?.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span className="font-medium text-sm text-muted-foreground w-4 mr-4">
                      {String.fromCharCode(65 + i)}:
                    </span>

                    <Input
                      className="h-10"
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      {...register(`questions.${index}.options.${i}`)}
                      value={watchedQuestion?.options?.[i] || ''}
                      error={errors?.options?.[i]}
                    />

                    <Button
                      className="mb-auto h-10"
                      variant="destructive"
                      onClick={() => {
                        removeOption(i);
                      }}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-1 font-medium">Correct Answer</h4>

              <Select
                id={`questions.${index}.correctAnswer`}
                {...register(`questions.${index}.correctAnswer`)}
                value={watchedQuestion?.correctAnswer || ''}
                options={
                  question.options?.map((option, i) => ({
                    value: option,
                    label: String.fromCharCode(65 + i),
                  })) || []
                }
                error={errors?.correctAnswer}
              />
            </div>
          </>
        )}

        {question.type === 'true-false' && (
          <div>
            <h4 className="mb-1 font-medium">Correct Answer</h4>

            <Select
              id={`questions.${index}.correctAnswer`}
              {...register(`questions.${index}.correctAnswer`)}
              value={watchedQuestion?.correctAnswer || ''}
              options={[
                { value: 'true', label: 'True' },
                { value: 'false', label: 'False' },
              ]}
              error={errors?.correctAnswer}
            />
          </div>
        )}

        {question.type === 'open-ended' && (
          <div>
            <QuestionLabel
              index={index}
              htmlFor="expected-answer"
              text="Expected Answer"
            />

            <Input
              id={`questions.${index}.correctAnswer`}
              {...register(`questions.${index}.correctAnswer`)}
              value={watchedQuestion?.correctAnswer || ''}
              placeholder="Enter expected answer..."
              error={errors?.correctAnswer}
            />
          </div>
        )}

        <div>
          <QuestionLabel
            index={index}
            htmlFor="explanation"
            text="Explanation (optional)"
          />

          <Textarea
            id={`questions.${index}.explanation`}
            {...register(`questions.${index}.explanation`)}
            value={watchedQuestion?.explanation || ''}
            placeholder="Explain the correct answer..."
            error={errors?.explanation}
          />
        </div>
      </div>
    </section>
  );
}
