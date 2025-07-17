// type Result<T, ErrorType> = Ok<T> | Err<ErrorType>;
type ConstrainedError<E extends Error> = E;
export type ErrorType<E extends ConstrainedError<any>> = NonNullable<E>;
type ResultType<T> = NonNullable<T>;
export type Result<
  R extends ResultType<any>,
  E extends ErrorType<ConstrainedError<any>>
> =
  | {
      data: R;
      error: undefined;
    }
  | {
      data: undefined;
      error: E;
    };

export function ok<ResultType>(value: ResultType): Result<ResultType, never> {
  return { data: value, error: undefined };
}

export function err<ErrorType>(error: ErrorType): Result<never, ErrorType> {
  return { data: undefined, error: error };
}
