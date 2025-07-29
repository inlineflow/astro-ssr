import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import type { APIError } from "../lib/types";
import type { Brand } from "src/lib/schema";
import { baseUrl } from "../env";

export const brand = {
  getBrand: defineAction({
    input: z.object({
      id: z.string().uuid(),
    }),
    handler: async (input) => {
      const resp = await fetch(`${baseUrl}/brand/${input.id}`);
      const result = (await resp.json()) as Brand | APIError;
      if ("error" in result) {
        throw new ActionError({
          code: ActionError.statusToCode(result.error.status),
          message: result.error.message,
        });
      }
      return result;
    },
  }),
  getAllBrands: defineAction({
    handler: async () => {
      const resp = await fetch(`${baseUrl}/brand`);
      const result = (await resp.json()) as Brand[] | APIError;
      if ("error" in result) {
        throw new ActionError({
          code: ActionError.statusToCode(result.error.status),
          message: result.error.message,
        });
      }
      return result;
    },
  }),
};
