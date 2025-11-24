interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={`max-w-7xl mx-auto px-6 ${className}`}>{children}</div>
  );
}
