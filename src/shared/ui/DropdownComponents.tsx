import type { SelectHTMLAttributes } from 'react';

interface SeletctProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  defaultOption?: string;
  onClear?: () => void;
}
export function DropdownComponent(props: SeletctProps) {
  const { label, options, onClear, defaultOption = 'Any', ...rest } = props;

  const onClearClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!onClear) return;
    e.preventDefault();
    onClear();
  };
  return (
    <label className="flex flex-col gap-1.5">
      <span className="leading-none font-nunito font-bold text-sm text-navy-800 px-2">{label}</span>

      <span className="relative">
        <select
          className="
          appearance-none
          w-full rounded-md border pl-2 pr-8 py-1 text-sm shadow-sm transition-all
          text-navy-900 placeholder:text-navy-900/25
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ring-offset-2 ring-offset-navy-100 disabled:cursor-not-allowed disabled:opacity-50
          "
          {...rest}
        >
          <option value="">{defaultOption}</option>
          {options.map(option => (
            <option
              key={option}
              value={option.toLowerCase()}
            >
              {option}
            </option>
          ))}
        </select>

        <span className={`
        absolute right-2 top-1/2 -translate-y-1/2 w-4 h-8 flex items-center justify-center pointer-events-none text-navy-900 transition-transform
        ${rest.value === '' ? 'translate-x-0 delay-75' : '-translate-x-6 delay-0'}
        `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-full h-auto"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>
        </span>
        <span
          className={`
          absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full flex items-center justify-center cursor-pointer text-red-500 transition-opacity
           ${rest.value === '' ? 'opacity-0 pointer-events-none delay-0' : 'opacity-100 pointer-events-auto delay-75'}
           `}
          onClick={onClearClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-auto"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </span>
      </span>
    </label>
  );
}
