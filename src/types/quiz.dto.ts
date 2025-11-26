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
  answer_checking_mode: AnswerCheckingMode;
  attempts: number;
  created_at: string;
  total_submissions?: number;
  average_score?: number;
  recent_submissions?: {
    date: string;
    score: number;
    percentage: string;
  }[];
  created_by: string;
}
