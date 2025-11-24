'use client';

import Input from '@/src/components/input/Input';
import Select from '@/src/components/select/Select';
import { Button } from '@/src/components/ui/Button';
import Link from 'next/link';
import routes from '@/src/lib/routes';
import QuestionCarousel from '@/src/components/quizForm/QuestionCarousel';
import { toast } from 'sonner';
import { QuizFormType } from '@/src/components/quizForm/quizForm.schema';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quizFormSchema } from '@/src/components/quizForm/quizForm.schema';
import ErrorMessage from '@/src/components/errorMessage/ErrorMessage';

export default function NewQuizPage() {
  const formMethods = useForm<QuizFormType>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: '',
      answerCheckingMode: 'immediate',
      questions: [
        {
          id: '1',
          type: 'multiple-choice',
          prompt: '',
          options: ['', '', '', '', ''],
          correctAnswer: '',
          explanation: '',
        },
      ],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formMethods;

  const questions = useWatch({
    control: formMethods.control,
    name: 'questions',
  });

  const onSubmit = (data: QuizFormType) => {
    console.log('Form Data:', data);
    toast.success('Quiz saved successfully!');
  };

  return (
    <FormProvider {...formMethods}>
      <header>
        <h2 className="text-white text-4xl font-bold mb-3">Create Quiz</h2>
        <p className="text-muted-foreground">
          Build your quiz with custom questions and settings
        </p>
      </header>

      <form
        className="flex flex-col gap-6 mt-8"
        onSubmit={(e) => {
          e.preventDefault();

          if (!questions || questions.length === 0) {
            toast.error('Please add at least one question.');
            return;
          }

          handleSubmit(onSubmit)(e);
        }}
      >
        <section className="bg-card rounded-md p-6">
          <h3 className="text-lg font-medium">Quiz Settings</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Configure your quiz title and behavior
          </p>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block mb-0.5 font-medium" htmlFor="quiz-title">
                Quiz Title
              </label>

              <Input
                id="quiz-title"
                {...register('title')}
                placeholder="Enter quiz title..."
                className="mt-1"
                error={errors.title}
              />
            </div>

            <div>
              <label
                className="block mb-2 font-medium"
                htmlFor="answer-checking-mode"
              >
                Answer Checking Mode
              </label>

              <Select
                id="answer-checking-mode"
                {...register('answerCheckingMode')}
                options={[
                  {
                    value: 'immediate',
                    label: 'Immediate - Check answers right away',
                  },
                  {
                    value: 'on-completion',
                    label: 'On Completion - Check answers at the end',
                  },
                ]}
                error={errors.answerCheckingMode}
              />
            </div>

            <div>
              <h4 className="font-medium">Number of Questions</h4>
              <p className="text-muted-foreground text-sm">
                {questions?.length || 0} question
                {questions?.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
        </section>

        <section>
          <QuestionCarousel
            questions={questions}
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <ErrorMessage error={errors.questions} />
        </section>

        <footer className="flex gap-2 items-center ml-auto">
          <Button variant="outline" asChild>
            <Link href={routes.dashboard}>Cancel</Link>
          </Button>

          <Button type="submit">Save Quiz</Button>
        </footer>
      </form>
    </FormProvider>
  );
}
