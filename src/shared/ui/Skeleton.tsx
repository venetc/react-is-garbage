import type { ComponentProps } from 'react';

interface SkeletonProps extends ComponentProps<'div'> {
  isLoading: boolean;
}

export function Skeleton(props: SkeletonProps) {
  const { isLoading, className, children } = props;

  return (
    isLoading
      ? <div className={`rounded-md bg-navy-100 ${className ?? ''}`} />
      : children
  );
}
