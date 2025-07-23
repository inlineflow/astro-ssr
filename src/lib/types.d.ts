import type { ActionError } from "astro:actions";
import type { ValidationError } from "../validations/errors";
import type { establishmentSchema } from "./schema";

export type Product = {
  id: number;
  name: string;
};

type APIError = {
  error: { status: number; message: string };
};

export type AstroResponse<T> = T | APIError;

export type ErrorType = ActionError | ValidationError | Error;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
