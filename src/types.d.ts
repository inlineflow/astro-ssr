import type { ActionError } from "astro:actions";

export type Product = {
  id: number;
  name: string;
};

export type Service = {
  openingTime: string; //ISO
  closingTime: string; //ISO
  intervalInMinutes: number;
};

export type NetworkError = {
  error: string;
};

type APIError = {
  error: { status: number; message: string };
};

export type AstroResponse<T> = T | APIError;
