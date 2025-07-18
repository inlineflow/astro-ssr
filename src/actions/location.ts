import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { baseUrl } from "src/env";
import type { Location } from "src/lib/schema";
import type { APIError } from "src/lib/types";

export const location = {
  getLocation: defineAction({
    input: z.object({
      id: z.string().uuid(),
    }),
    handler: async (input) => {
      const resp = await fetch(`${baseUrl}/location/${input.id}`);
      const result = (await resp.json()) as Location | APIError;
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
