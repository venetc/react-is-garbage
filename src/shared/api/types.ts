export interface ApiResponseInfinite<T> {
  info: { count: number; next: string | null; pages: number; prev: string | null };
  results: T;
}

export type Page = { page: string };

export type Simplify<T> = {
  [K in keyof T]: T[K];
// eslint-disable-next-line ts/ban-types
} & {};
