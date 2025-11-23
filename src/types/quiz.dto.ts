export interface QuizDTO {
  id: string;
  title: string;
  questions: number;
  answerChecking: 'immediate' | 'on-completion';
  attempts: number;
  createdAt: string;
}
