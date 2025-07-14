import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { useForm } from "react-hook-form";
import { AppointmentCalendar } from "./AppointmentCalendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import { TimeBlocks } from "./Timeblocks";
import type { ServiceValidated } from "src/types";
import { Button } from "@/ui/button";

const FormSchema = z.object({
  calendarDate: z
    .string({
      error: "A date is required.",
    })
    .nonempty(),
  timeOfDay: z
    .string({
      error: "Appointment time is required.",
    })
    .nonempty(),
});

export const AppointmentForm = ({ service }: { service: ServiceValidated }) => {
  console.log("service in form: ", service);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { calendarDate: DateTime.now().toISO() },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const timeOfDay = DateTime.fromISO(data.timeOfDay);
    // console.log(DateTime.fromISO(data.calendarDate).toFormat("yyyy MM dd"));
    // console.log(DateTime.fromISO(data.timeOfDay).toFormat("T"));
    const appointment = DateTime.fromISO(data.calendarDate).set({
      hour: timeOfDay.hour,
      minute: timeOfDay.minute,
      millisecond: 0,
      second: 0,
    });

    console.log("Your appointment is at: ", appointment.toISO());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-10">
          <FormField
            control={form.control}
            name="calendarDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>Calendar Date</FormLabel>
                <FormControl>
                  <AppointmentCalendar
                    onSelect={(d) => {
                      field.onChange(DateTime.fromJSDate(d).toISO());
                    }}
                    selected={DateTime.fromISO(field.value).toJSDate()}
                    disabled={(date) =>
                      date < DateTime.now().minus({ day: 1 }).toJSDate()
                    }
                  />
                </FormControl>
                {/* <FormDescription>Your booking date.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="timeOfDay"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TimeBlocks
                    openingTime={service.openingTime}
                    closingTime={service.closingTime}
                    intervalInMinutes={service.intervalInMinutes}
                    onSelect={(dt) => field.onChange(dt)}
                    selected={field.value}
                  />
                </FormControl>
                <FormLabel hidden>Time of day of the appointment.</FormLabel>
                {/* <FormDescription>Time slot</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
