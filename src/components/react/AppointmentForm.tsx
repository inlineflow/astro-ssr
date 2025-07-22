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
import { EmployeePicker } from "./EmployeePicker";
import { ServicePicker } from "./ServicePicker";
import { CalendarDays, Clock } from "lucide-react";
import { Separator } from "@/ui/separator";
import {
  AppointmentServiceControls,
  ServiceErrorMessage,
} from "./AppointmentServiceControls";

const capitalize = (s: string) => s.slice(0, 1).toUpperCase() + s.slice(1);

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
  serviceOpts: z.object(
    {
      employeeId: z.uuid({ error: "Employee is required." }),
      serviceId: z.uuid({ error: "Service is required." }),
    },
    { error: "Service opts are required" }
  ),
});

export type AppointmentFormValues = z.infer<typeof FormSchema>;

export const AppointmentForm = ({ location }: { location: Location }) => {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      calendarDate: DateTime.now().toISO(),
      serviceOpts: { employeeId: "", serviceId: "" },
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const timeOfDay = DateTime.fromISO(data.timeOfDay);
    const appointment = DateTime.fromISO(data.calendarDate).set({
      hour: timeOfDay.hour,
      minute: timeOfDay.minute,
      millisecond: 0,
      second: 0,
    });

    console.log("Submitting: ", data);

    const requestBody = {
      datetime: appointment.toISO()!,
      serviceId: data.serviceOpts.serviceId,
      userId: crypto.randomUUID(),
      employeeId: data.serviceOpts.employeeId,
      establishmentId: location.establishmentId,
    };
    const promise = actions.appointment.postAppointment(requestBody);

    toast.promise(promise, {
      loading: "Loading...",
      success: () => (
        <div>
          <p className="text-lg">Your appointment is at: </p>
          <div className="flex flex-row gap-3 min-h-2 h-4 items-center">
            <div className="flex space-x-1 flex-row items-center justify-center">
              <Clock size={16} />
              <p>{appointment.toFormat("T")}</p>
            </div>
            <Separator orientation="vertical" className="w-8 h-2 border-1" />
            <div className="flex space-x-1 flex-row items-center justify-center">
              <CalendarDays size={16} />
              {/* <p>{appointment.toFormat("dd.MM.yy")}</p> */}
              <p>
                {capitalize(
                  appointment.toLocaleString(
                    {
                      weekday: "long",
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    },
                    { locale: "ru-RU" }
                  )
                )}
              </p>
            </div>
            {/* <Card className="flex-row gap-0 items-center px-2 py-0 max-w-fit bg-black text-white text">
              {appointment.toFormat("dd.MM.yy")}
            </Card> */}
          </div>
        </div>
      ),
      // success: () => {
      //   return {
      //     message: "Your appointment has been successfully booked.",
      //     description: `Time: ${appointment.toFormat("T, dd.MM.yy")}`,
      //     descriptionClassName: "!text-black",
      //   };
      // },
      error: "Error",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 w-full items-center justify-center space-y-5"
      >
        <FormField
          control={form.control}
          name="serviceOpts"
          render={({ field }) => (
            <FormItem>
              <FormLabel hidden>Service</FormLabel>
              <FormControl>
                <AppointmentServiceControls
                  employees={location.employees}
                  services={location.services}
                  onSelectEmployee={(employeeId) =>
                    field.onChange({ ...field.value, employeeId })
                  }
                  onSelectService={(serviceId) =>
                    field.onChange({ ...field.value, serviceId })
                  }
                  selectedEmployeeId={field.value.employeeId}
                  selectedServiceId={field.value.serviceId}
                />
              </FormControl>
              {/* <FormMessage /> */}
              {/* <ServiceErrorMessage /> */}
            </FormItem>
          )}
        ></FormField>
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
