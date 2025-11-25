import { twMerge } from 'tailwind-merge';

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled: boolean;
  isCorrect?: boolean;
  isChecked?: boolean;
}

export default function AnswerRadioButton({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  disabled,
  isCorrect,
  isChecked,
}: RadioButtonProps) {
  const conditionalClasses =
    isChecked && checked
      ? isCorrect
        ? 'border-green-500 bg-green-500/10'
        : 'border-red-500 bg-red-500/10'
      : '';

  return (
    <div
      className={twMerge(
        `border border-border rounded-md px-4 py-3 ${
          disabled && !checked ? 'opacity-50' : ''
        } transition flex items-center ${conditionalClasses}`
      )}
    >
      <div className="relative flex mr-3">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`${
            disabled ? 'pointer-events-none' : 'cursor-pointer'
          } appearance-none border border-border rounded-full w-4 h-4`}
        />
        {checked && (
          <span className="absolute w-2 h-2 bg-primary rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></span>
        )}
      </div>
      <label
        className={`${
          disabled ? 'pointer-events-none' : 'cursor-pointer'
        } text-sm flex items-center`}
        htmlFor={id}
      >
        {label && <span className="font-semibold mr-2">{label}</span>}
        <span>{value}</span>
      </label>
    </div>
  );
}
