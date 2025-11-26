import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface LoadingProps {
  height?: string;
  className?: string;
}

export default function Loading({ height = '', className = '' }: LoadingProps) {
  return (
    <div
      className={twMerge(
        'flex items-center justify-center bg-background',
        height,
        className
      )}
    >
      <Loader2 className="w-10 h-10 text-muted-foreground animate-spin" />
    </div>
  );
}
