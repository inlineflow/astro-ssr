import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { baseUrl } from "src/env";
import type { Service } from "src/types";

export const server = {
  getBookedAppointemnts: defineAction({
    handler: async () => {
      const resp = await fetch(`${baseUrl}/appointments/booked`);
      const result = (await resp.json()) as Date[];
      return result;
    },
  }),
  getService: defineAction({
    input: z.object({
      id: z.number(),
    }),
    handler: async (input) => {
      const resp = await fetch(`${baseUrl}/service/${input.id}`);
      const result = (await resp.json()) as Service;
      return result;
    },
  }),
};
