import type { ActionError } from "astro:actions";
import type { DateTime } from "root";
import type { ValidationError } from "../validations/errors";
import type { establishmentSchema } from "./schema";

export type Product = {
  id: number;
  name: string;
};

// export type Establishment = {
//   openingTime: string; //ISO
//   closingTime: string; //ISO
//   intervalInMinutes: number;
//   description: string;
//   address: string;
//   name: string;
// };

type APIError = {
  error: { status: number; message: string };
};

export type AstroResponse<T> = T | APIError;

export type ErrorType = ActionError | ValidationError | Error;
