import { QuestionDTO } from './question.dto';

export type AnswerCheckingMode = 'immediate' | 'on-completion';

export const answerCheckingModeOptions: AnswerCheckingMode[] = [
  'immediate',
  'on-completion',
];

export const answerCheckingModeLabels: Record<AnswerCheckingMode, string> = {
  immediate: 'Immediate Feedback',
  'on-completion': 'On Completion',
};

export interface QuizDTO {
  id: string;
  title: string;
  questions: QuestionDTO[];
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
  created_by: string;
}
