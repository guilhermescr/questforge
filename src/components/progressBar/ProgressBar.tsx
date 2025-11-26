interface ProgressBarProps {
  progress: number;
  label?: string;
}

export default function ProgressBar({ progress, label }: ProgressBarProps) {
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between text-muted-foreground text-sm my-2">
          <span>{label}</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-primary/20">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
