export type AnswerCheckingMode = 'immediate' | 'on-completion';

export const answerCheckingModeOptions: AnswerCheckingMode[] = [
  'immediate',
  'on-completion',
];

export interface QuizDTO {
  id: string;
  title: string;
  questions: {
    id: string;
    prompt: string;
    options?: string[];
    correctAnswer: string | boolean;
    explanation?: string;
  }[];
  answerChecking: AnswerCheckingMode;
  attempts: number;
  created_at: string;
  total_submissions?: number;
  average_score?: string;
  recent_submissions?: {
    date: string;
    score: number;
    percentage: string;
  }[];
}
