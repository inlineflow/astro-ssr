import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { apiUrl } from "src/env";
import i18n from "src/lib/i18n";
import {
  LocationCreateFormSchema,
  LocationSearchParamsSchema,
  type Location,
} from "src/lib/schema";
import type { APIError } from "src/lib/types";

export const location = {
  postLocation: defineAction({
    input: z.object({
      data: LocationCreateFormSchema,
      brandId: z.string().uuid(),
    }),
    handler: async (input) => {
      const parseResult = LocationCreateFormSchema.safeParse(input.data);
      if (parseResult.error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: `${i18n.t("validation.failed_validation")}, ${i18n.t(
            "validation.errors"
          )}: ${parseResult.error.issues.map(
            (i) => `${i.path.join(".")}:${i.message}`
          )}`,
        });
      }
      const resp = await fetch(`${apiUrl}/brand/${input.brandId}/location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input.data),
      });
      const result = (await resp.json()) as { message: string; status: string };
      return result;
    },
  }),
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

  getLocationById: defineAction({
    input: z.object({
      locationId: z.string().uuid(),
    }),
    handler: async (input) => {
      const resp = await fetch(`${apiUrl}/location/${input.locationId}`);
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
