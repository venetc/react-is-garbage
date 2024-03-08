import type { ComponentProps } from 'react';

interface EntityFieldProps extends ComponentProps<'div'> {
  label: string;
  field: string;
  emitLowercase?: boolean;
  onFieldClick?: (value: string) => void;
  spoiler?: boolean;
}

export function EntityField(props: EntityFieldProps) {
  const { label, field, className, spoiler, onFieldClick, emitLowercase = false, ...rest } = props;
  const onClick = () => {
    if (onFieldClick) onFieldClick(emitLowercase ? field.toLowerCase() : field);
  };
  return (
    <div className={`relative flex gap-1 ${className ?? ''}`} {...rest}>
      <span className="font-fira_code font-bold">
        {label}
      </span>
      <span className={`line-clamp-1 ${onFieldClick ? 'cursor-pointer' : 'cursor-select'}`} onClick={onClick}>
        <span className={`
        capitalize 
        ${onFieldClick ? 'text-green-600' : 'text-navy-900'}
        ${spoiler ? 'blur-sm px-1 hover:blur-0 transition-all' : ''}
        `}
        >
          {field}
        </span>
        {onFieldClick && (
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
            className="inline w-auto align-middle h-[1em] ml-1 group-hover:text-navy-500/75 text-transparent transition-colors max-sm:text-navy-500/75"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        )}
      </span>
    </div>
  );
}
