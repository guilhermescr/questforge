import { z } from 'zod';
import { answerCheckingModeOptions } from '@/src/types/quiz.dto';
import { questionTypeOptions } from '@/src/types/question.dto';

export const quizFormSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  answerCheckingMode: z.enum(
    answerCheckingModeOptions,
    'Answer checking mode is required'
  ),
  questions: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum(questionTypeOptions.map((option) => option.value)),
        prompt: z.string().min(1, 'Question prompt is required'),
        options: z
          .array(z.string().min(1, 'Option cannot be empty'))
          .optional(),
        correctAnswer: z.string().min(1, 'Correct answer is required'),
        explanation: z.string().optional(),
      })
    )
    .min(1, 'At least one question is required'),
});

export type QuizFormType = z.infer<typeof quizFormSchema>;
