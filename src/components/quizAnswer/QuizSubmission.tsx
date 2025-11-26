import { Button } from '@/src/components/ui/Button';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface QuizSubmissionProps {
  isSubmitting: boolean;
  remainingQuestionsCount: number;
  onSubmit: () => void;
}

export default function QuizSubmission({
  isSubmitting,
  remainingQuestionsCount,
  onSubmit,
}: QuizSubmissionProps) {
  return (
    <div className="border border-border rounded-md p-4 mx-auto flex flex-col items-center gap-2">
      <Button
        className="text-lg py-6 w-full"
        type="button"
        onClick={onSubmit}
        disabled={remainingQuestionsCount > 0 || isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="mr-2 animate-spin" size={16} />
        ) : (
          <CheckCircle2 className="mr-2" size={16} />
        )}
        {isSubmitting
          ? 'Submitting...'
          : remainingQuestionsCount === 0
          ? 'Submit Quiz'
          : `Answer ${remainingQuestionsCount} more question${
              remainingQuestionsCount !== 1 ? 's' : ''
            }`}
      </Button>

      {remainingQuestionsCount > 0 && (
        <p className="text-sm text-muted-foreground">
          Please answer all questions to submit
        </p>
      )}
    </div>
  );
}
