import ProgressBar from '@/src/components/progressBar/ProgressBar';

interface QuizHeaderProps {
  title: string;
  totalQuestions: number;
  progressPercentage: number;
  answeredCount: number;
  answerCheckingModeLabel: string;
}

export default function QuizHeader({
  title,
  totalQuestions,
  progressPercentage,
  answeredCount,
  answerCheckingModeLabel,
}: QuizHeaderProps) {
  return (
    <header className="flex flex-col gap-2 justify-between w-full">
      <h1 className="text-white text-4xl font-bold">{title}</h1>
      <p className="text-muted-foreground">
        {totalQuestions} questions &bull; {answerCheckingModeLabel}
      </p>

      <ProgressBar
        progress={progressPercentage}
        label={`Progress (${answeredCount}/${totalQuestions})`}
      />
    </header>
  );
}
