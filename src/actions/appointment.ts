import { defineAction } from "astro:actions";
import { apiUrl } from "../env";
import { DateTime } from "luxon";
import { AppointmentSchema } from "../lib/schema";

export const appointment = {
  getBookedAppointemnts: defineAction({
    handler: async () => {
      const resp = await fetch(`${apiUrl}/appointments/booked`);
      const result = (await resp.json()) as string[];
      const dates = result.map((i) => DateTime.fromISO(i));
      return dates;
    },
  }),
  postAppointment: defineAction({
    input: AppointmentSchema,
    handler: async (input) => {
      try {
        console.log("input: ", input);
        console.log("typeof input: ", typeof input);
        console.log("JSON.stringify(input): ", JSON.stringify(input));

        const resp = await fetch(`${apiUrl}/appointment`, {
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
