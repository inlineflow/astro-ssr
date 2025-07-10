import { ActionError } from "astro:actions";

export const fetchData = async <T extends object>(
  url: string,
  options?: RequestInit
) => {
  const resp = await fetch(url, options);
  const result = (await resp.json()) as ActionError | T;
  return result;
};
