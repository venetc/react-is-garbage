import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onClear?: () => void;
}
export function TextInputComponent(props: InputProps) {
  const { label, onClear, ...rest } = props;
  return (
    <label className="flex flex-col gap-1.5">
      <span className="leading-none font-nunito font-bold text-sm text-navy-800 px-2">{label}</span>
      <span className="relative">
        <input
          type="text"
          className="
          w-full rounded-md border pl-2 py-1 text-sm transition-all
          text-navy-900 placeholder:text-navy-900/25
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ring-offset-2 ring-offset-navy-100 disabled:cursor-not-allowed disabled:opacity-50
          pr-8
          "
          {...rest}
        />
        <span
          className={`
          absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full flex items-center justify-center cursor-pointer text-red-500 transition-opacity
           ${rest.value ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
           `}
          onClick={onClear}
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
