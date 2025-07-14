type ErrorType<E extends Error> = NonNullable<E>;

// type Result<T, ErrorType> = Ok<T> | Err<ErrorType>;
type ResultType<T> = NonNullable<T>;
export type Result<ResultType, ErrorType> =
  | {
      data: ResultType;
      error: undefined;
    }
  | {
      data: undefined;
      error: ErrorType;
    };

export function ok<ResultType>(value: ResultType): Result<ResultType, never> {
  return { data: value, error: undefined };
}

export function err<ErrorType>(error: ErrorType): Result<never, ErrorType> {
  return { data: undefined, error: error };
}
