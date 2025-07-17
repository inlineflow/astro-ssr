import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import type { APIError, Establishment as Establishment } from "../lib/types";
import { baseUrl } from "../env";

export const establishment = {
  getEstablishment: defineAction({
    input: z.object({
      id: z.number(),
    }),
    handler: async (input) => {
      const resp = await fetch(`${baseUrl}/establishment/${input.id}`);
      const result = (await resp.json()) as Establishment | APIError;
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
