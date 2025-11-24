export type QuestionType = 'multiple-choice' | 'true-false' | 'open-ended';

export const questionTypeOptions: { value: QuestionType; label: string }[] = [
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'true-false', label: 'True / False' },
  { value: 'open-ended', label: 'Open Ended' },
];

export interface QuestionDTO {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer: string | string[] | boolean;
  explanation?: string;
}
