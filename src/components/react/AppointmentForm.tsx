import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { useForm, type FieldValues } from "react-hook-form";
import { AppointmentCalendar } from "./AppointmentCalendar";

export const AppointmentForm = () => {
  const form = useForm();

  const onSubmit = (e: FieldValues) => {
    // val.preventDefault();
    console.log(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <AppointmentCalendar {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};
