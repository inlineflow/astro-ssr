import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { AppointmentCalendar } from "./AppointmentCalendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import { TimeBlocks } from "./Timeblocks";
import type { Location } from "src/lib/schema";
import { Button } from "@/ui/button";
import { toast } from "sonner";
import { actions } from "astro:actions";
import { CalendarDays, Clock } from "lucide-react";
import { Separator } from "@/ui/separator";
import { AppointmentServiceControls } from "./AppointmentServiceControls";
import { SelectedServiceProvider } from "./AppointmentServiceControlsContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "src/lib/i18n";
// import { t as t } from "i18next";

const capitalize = (s: string) => s.slice(0, 1).toUpperCase() + s.slice(1);

const FormSchema = z.object({
  calendarDate: z
    .string({
      error: "form_missing_date",
    })
    .nonempty(),
  timeOfDay: z
    .string({
      error: i18n.t("form_missing_appointment_time"),
    })
    .nonempty({ error: i18n.t("form_missing_appointment_time") }),
  serviceOpts: z.object(
    {
      employeeId: z.uuid({ error: i18n.t("form_missing_employee") }),
      serviceId: z.uuid({ error: i18n.t("form_missing_service") }),
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

  const { t } = useTranslation();

  // console.log("Language on client: ", i18n.language);

  // const watchedService = form.use("serviceOpts.serviceId");
  const watchedService = useWatch({
    control: form.control,
    name: "serviceOpts.serviceId",
  });
  // console.log("watchedService: ", watchedService);

  useEffect(() => {
    form.setValue("timeOfDay", "", { shouldValidate: true, shouldDirty: true });
  }, [watchedService, form.setValue]);

  // console.log("Fork state: ", Object.values(form.formState.errors));

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
      loading: i18n.t("loading.spinner"),
      success: () => (
        <div>
          <p className="text-lg">{i18n.t("appointment.successful.message")}</p>
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
      // duration: 2500,
      // dismissible: true,
      closeButton: true,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 w-full items-center justify-center space-y-5"
      >
        <SelectedServiceProvider>
          <FormField
            control={form.control}
            name="serviceOpts"
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>{i18n.t("service")}</FormLabel>
                <FormControl>
                  <AppointmentServiceControls
                    employees={location.employees}
                    services={location.services}
                    onSelectEmployee={(employeeId) =>
                      field.onChange({
                        ...field.value,
                        employeeId,
                      })
                    }
                    onSelectService={(serviceId) =>
                      field.onChange({
                        ...field.value,
                        serviceId,
                      })
                    }
                    selectedEmployeeId={field.value.employeeId}
                    selectedServiceId={field.value.serviceId}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 justify-center ">
            <FormField
              control={form.control}
              name="calendarDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>{i18n.t("form.calendar_date")}</FormLabel>
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
                <FormItem className="aspect-square md:justify-center">
                  <FormControl>
                    <TimeBlocks
                      openingTime={location.openingTime}
                      closingTime={location.closingTime}
                      onSelect={(dt) => field.onChange(dt)}
                      selected={field.value}
                    />
                  </FormControl>
                  <FormLabel hidden>{i18n.t("form_timeOfDay_label")}</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div>
            <p className="text-destructive">
              {Object.values(form.formState.errors).length > 0
                ? "Fill in the required fields."
                : ""}
            </p>
          </div>
          <Button type="submit" className="w-full mt-5 mb-100">
            {/* Submit */}
            {t("form_submit")}
          </Button>
        </SelectedServiceProvider>
      </form>
    </Form>
  );
};
