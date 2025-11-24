export type AnswerCheckingMode = 'immediate' | 'on-completion';

export const answerCheckingModeOptions: AnswerCheckingMode[] = [
  'immediate',
  'on-completion',
];

export interface QuizDTO {
  id: string;
  title: string;
  questions: number;
  answerChecking: AnswerCheckingMode;
  attempts: number;
  createdAt: string;
}
