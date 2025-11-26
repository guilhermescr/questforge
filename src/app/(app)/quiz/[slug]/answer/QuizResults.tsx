import ProgressBar from '@/src/components/progressBar/ProgressBar';
import { Button } from '@/src/components/ui/Button';
import routes from '@/src/lib/routes';
import { QuizDTO } from '@/src/types/quiz.dto';
import { CheckCircle2, Home, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

interface QuizResultsProps {
  quiz: QuizDTO;
  correctAnswers: number;
  totalQuestions: number;
  progressPercentage: number;
  correctPercentage: number;
  feedbackMessage: string;
  onRetake: () => void;
}

export default function QuizResults({
  quiz,
  correctAnswers,
  totalQuestions,
  progressPercentage,
  correctPercentage,
  feedbackMessage,
  onRetake,
}: QuizResultsProps) {
  return (
    <section className="bg-card border border-border rounded-md p-4 text-center mb-6 w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle2 className="text-primary" size={40} />
        </div>
        <h2 className="text-3xl font-semibold">Quiz Complete!</h2>
        <p className="text-muted-foreground text-sm">
          Here are your results for {quiz.title}
        </p>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <p className="text-4xl font-bold text-primary mb-2">
            {correctAnswers}/{totalQuestions}
          </p>
          <p className="text-muted-foreground text-lg font-medium">
            {correctPercentage}% correct
          </p>
        </div>

        <ProgressBar progress={progressPercentage} />

        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-foreground font-medium">{feedbackMessage}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <Button
            className="w-full md:w-auto"
            variant="secondary"
            onClick={onRetake}
          >
            <RefreshCcw className="mr-2" size={16} />
            Retake Quiz
          </Button>

          <Button className="w-full md:w-auto" size="sm" asChild>
            <Link href={routes.dashboard}>
              <Home className="mr-2" size={16} />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
