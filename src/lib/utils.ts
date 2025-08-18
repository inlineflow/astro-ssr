import { ValidationError } from "src/validations/errors";

export const isValidationError = (err: unknown): err is ValidationError =>
  err instanceof ValidationError;

export const conjugate = (value: number, words: string[]) => {
  // if (words.length === 1) {
  //   return words[0];
  // }

  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20 && words.length > 2) return words[2];
  if (num > 1 && num < 5 && words.length > 1) return words[1];
  if (num == 1) return words[0];
  return words[2];
};

export const capitalize = (s: string) =>
  s.slice(0, 1).toUpperCase() + s.slice(1);

export type keysOf<o> = o extends readonly unknown[]
  ? number extends o["length"]
    ? `${number}`
    : keyof o & `${number}`
  : {
      [K in keyof o]: K extends string ? K : K extends number ? `${K}` : never;
    }[keyof o];

export const keysOf = <o extends object>(o: o) => Object.keys(o) as keysOf<o>[];
