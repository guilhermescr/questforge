import { ChevronDown } from 'lucide-react';
import ErrorMessage from '../errorMessage/ErrorMessage';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  className?: string;
  error?: { message?: string };
}

export default function Select({
  options,
  className,
  error,
  ...rest
}: SelectProps) {
  return (
    <>
      <div className="relative">
        <select
          {...rest}
          className={`cursor-pointer w-full p-2 pr-8 border-2 border-border rounded-md bg-input text-white focus:outline-none focus:ring focus:ring-ring focus:border-ring transition appearance-none ${
            error ? 'border-red-500' : ''
          } ${className}`}
        >
          {options.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none"
          size={18}
        />
      </div>

      <ErrorMessage error={error} />
    </>
  );
}
