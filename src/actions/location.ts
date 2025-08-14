import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { apiUrl } from "src/env";
import { LocationSearchParamsSchema, type Location } from "src/lib/schema";
import type { APIError } from "src/lib/types";

export const location = {
  searchLocations: defineAction({
    input: LocationSearchParamsSchema,
    handler: async (input) => {
      const resp = await fetch(`${apiUrl}/location/search`, {
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = (await resp.json()) as Location[] | APIError;
      console.log("resp from location search: ", result);
      if ("error" in result) {
        console.log("error when parsing location search");
        throw new ActionError({
          code: ActionError.statusToCode(result.error.status),
          message: result.error.message,
        });
      }
      return result;
    },
  }),
  getAllLocations: defineAction({
    handler: async () => {
      const resp = await fetch(`${apiUrl}/location`);
      const result = (await resp.json()) as Location[] | APIError;
      if ("error" in result) {
        throw new ActionError({
          code: ActionError.statusToCode(result.error.status),
          message: result.error.message,
        });
      }

      return result;
    },
  }),
  getLocationsByBrandId: defineAction({
    input: z.string().uuid(),
    handler: async (brandId) => {
      const resp = await fetch(`${apiUrl}/brand/${brandId}/locations`);
      const result = (await resp.json()) as Location[] | APIError;
      if ("error" in result) {
        throw new ActionError({
          code: ActionError.statusToCode(result.error.status),
          message: result.error.message,
        });
      }

      return result;
    },
  }),

  getLocation: defineAction({
    input: z.object({
      id: z.string().uuid(),
    }),
    handler: async (input) => {
      const resp = await fetch(`${apiUrl}/location/${input.id}`);
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
