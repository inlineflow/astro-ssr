import { defineAction } from "astro:actions";
import { baseUrl } from "src/env";

export const server = {
  getBookedAppointemnts: defineAction({
    handler: async () => {
      const resp = await fetch(`${baseUrl}/appointments/booked`);
      const result = (await resp.json()) as Date[];
      return result;
    },
  }),
};
