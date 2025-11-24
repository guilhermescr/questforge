import { twMerge } from 'tailwind-merge';
import ErrorMessage from '../errorMessage/ErrorMessage';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: { message?: string };
}

export default function Textarea({ className, error, ...rest }: TextareaProps) {
  return (
    <>
      <textarea
        {...rest}
        className={twMerge(
          'w-full p-2 border-2 border-border rounded-md bg-input text-white focus:outline-none focus:ring focus:ring-ring focus:border-ring transition',
          error ? 'border-red-500' : '',
          className
        )}
      />
      <ErrorMessage error={error} />
    </>
  );
}
