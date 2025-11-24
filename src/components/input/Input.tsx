import { twMerge } from 'tailwind-merge';
import ErrorMessage from '../errorMessage/ErrorMessage';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: { message?: string };
}

export default function Input({ className, error, ...rest }: InputProps) {
  return (
    <div className="w-full">
      <input
        {...rest}
        className={twMerge(
          'w-full p-2 border-2 border-border rounded-md bg-input text-white focus:outline-none focus:ring focus:ring-ring focus:border-ring transition',
          error ? 'border-red-500' : '',
          className
        )}
      />
      <ErrorMessage error={error} />
    </div>
  );
}
