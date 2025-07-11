import { ActionError, defineAction } from "astro:actions";
import { DateTime } from "luxon";
import { z } from "astro:schema";
import { baseUrl } from "src/env";
import type { APIError, Service } from "src/types";

export const server = {
  getBookedAppointemnts: defineAction({
    handler: async () => {
      const resp = await fetch(`${baseUrl}/appointments/booked`);
      const result = (await resp.json()) as string[];
      const dates = result.map((i) => DateTime.fromISO(i));
      return dates;
    },
  }),
  getService: defineAction({
    input: z.object({
      id: z.number(),
    }),
    handler: async (input) => {
      const resp = await fetch(`${baseUrl}/service/${input.id}`);
      const result = (await resp.json()) as Service | APIError;
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
