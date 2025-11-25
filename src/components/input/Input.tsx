import { twMerge } from 'tailwind-merge';
import ErrorMessage from '../errorMessage/ErrorMessage';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: { message?: string };
  state?: {
    isChecked?: boolean;
    isCorrect?: boolean;
  };
}

export default function Input({
  className,
  error,
  state,
  disabled,
  ...rest
}: InputProps) {
  return (
    <div className="w-full">
      <input
        {...rest}
        className={twMerge(
          'w-full py-2 px-2.5 border-2 border-border rounded-md bg-input text-white focus:outline-none focus:ring focus:ring-ring focus:border-ring transition',
          error ? 'border-red-500' : '',
          state?.isChecked
            ? state.isCorrect
              ? 'border-green-500'
              : 'border-red-500'
            : '',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className
        )}
        disabled={disabled}
      />
      <ErrorMessage error={error} />
    </div>
  );
}
