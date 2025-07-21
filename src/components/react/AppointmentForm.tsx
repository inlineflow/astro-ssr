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
import type { Location } from "src/lib/schema";
import { Button } from "@/ui/button";
import { toast } from "sonner";
import { actions } from "astro:actions";

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

export const AppointmentForm = ({ location }: { location: Location }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { calendarDate: DateTime.now().toISO() },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const timeOfDay = DateTime.fromISO(data.timeOfDay);
    const appointment = DateTime.fromISO(data.calendarDate).set({
      hour: timeOfDay.hour,
      minute: timeOfDay.minute,
      millisecond: 0,
      second: 0,
    });

    // toast(`Your appointment is at: ${appointment.toISO()}`);
    const x = actions.appointment.postAppointment({
      datetime: appointment.toISO()!,
      serviceId: crypto.randomUUID(),
      userId: crypto.randomUUID(),
      employeeId: crypto.randomUUID(),
      establishmentId: crypto.randomUUID(),
    });
    toast.promise(x, {
      loading: "Loading...",
      success: (data) => {
        console.log(data.data);
        return `${data.data.appointmentId} toast has been added`;
      },
      error: "Error",
    });
    // const { data: postResponse, error } =
    //   await actions.appointment.postAppointment({
    //     datetime: appointment.toISO()!,
    //     serviceId: crypto.randomUUID(),
    //     userId: crypto.randomUUID(),
    //     employeeId: crypto.randomUUID(),
    //     establishmentId: crypto.randomUUID(),
    //   });

    // console.log("postResponse: ", postResponse);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 w-full items-center justify-center space-y-5"
      >
        <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 justify-center">
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
                    {...field}
                    className="w-full items-center justify-center"
                  />
                </FormControl>
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
                    openingTime={location.openingTime}
                    closingTime={location.closingTime}
                    durationInMinutes={location.services[0]?.durationInMinutes!}
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
        <Button type="submit" className="w-full mt-5 mb-100">
          Submit
        </Button>
      </form>
    </Form>
  );
};
