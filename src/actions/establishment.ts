import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import type { APIError } from "../lib/types";
import type { Establishment, EstablishmentLight } from "src/lib/schema";
import { baseUrl } from "../env";

export const establishment = {
  getEstablishment: defineAction({
    input: z.object({
      id: z.string().uuid(),
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
  getAllEstablishments: defineAction({
    handler: async () => {
      const resp = await fetch(`${baseUrl}/establishment`);
      const result = (await resp.json()) as EstablishmentLight[] | APIError;
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
