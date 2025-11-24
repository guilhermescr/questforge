import { Loader2 } from 'lucide-react';

interface LoadingProps {
  height?: string;
}

export default function Loading({ height = '' }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center bg-background ${height}`}>
      <Loader2 className="w-10 h-10 text-muted-foreground animate-spin" />
    </div>
  );
}
