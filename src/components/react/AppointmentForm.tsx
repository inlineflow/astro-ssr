import {
  Form,
  FormControl,
  FormDescription,
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
import type { Service } from "src/types";

const FormSchema = z.object({
  calendarDate: z.date({
    error: "A date is required.",
  }),
  timeOfDay: z.date({
    error: "Appointment time is required.",
  }),
});

export const AppointmentForm = ({ service }: { service: Service }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { calendarDate: new Date() },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // val.preventDefault();
    console.log(data);
    console.log("hello world");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="calendarDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <AppointmentCalendar
                  onSelect={field.onChange}
                  selected={field.value}
                  disabled={(date) =>
                    date < DateTime.now().minus({ day: 1 }).toJSDate()
                  }
                />
              </FormControl>
              <FormDescription>Your booking date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="timeOfDay"
          render={({ field }) => (
            <TimeBlocks
              openingTime={service.openingTime}
              closingTime={service.closingTime}
              intervalInMinutes={service.intervalInMinutes}
              onSelect={(dt) => field.onChange(dt.toJSDate())}
            />
          )}
        ></FormField>
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};
