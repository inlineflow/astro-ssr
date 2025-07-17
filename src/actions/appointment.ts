import { defineAction } from "astro:actions";
import { baseUrl } from "../env";
import { DateTime } from "luxon";
import { AppointmentPostRequestSchema } from "../lib/schema";

export const appointment = {
  getBookedAppointemnts: defineAction({
    handler: async () => {
      const resp = await fetch(`${baseUrl}/appointments/booked`);
      const result = (await resp.json()) as string[];
      const dates = result.map((i) => DateTime.fromISO(i));
      return dates;
    },
  }),
  postAppointment: defineAction({
    input: AppointmentPostRequestSchema,
    handler: async (input) => {
      try {
        console.log("input: ", input);
        console.log("typeof input: ", typeof input);
        console.log("JSON.stringify(input): ", JSON.stringify(input));

        const resp = await fetch(`${baseUrl}/appointment`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
          method: "POST",
        });

        const result = await resp.json();
        return result;
      } catch (error) {
        console.log(error);
      }
    },
  }),
};
