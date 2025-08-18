import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { z } from "zod";
import i18n from "src/lib/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { locationTypes, locationTypeToServices } from "src/lib/schema";

const FormSchema = z.object({
  name: z.string().min(1, { message: i18n.t("form.location_name_empty") }),
  type: z.enum(locationTypes, { message: i18n.t("form.location_type_empty") }),
  services: z
    .array(z.string())
    .min(1, { message: i18n.t("form.services_empty") }),
});

type LocationCreateFormValues = z.infer<typeof FormSchema>;
const onSubmit = async (data: LocationCreateFormValues) => {
  console.log(data);
};

export const LocationCreateForm = () => {
  const form = useForm<LocationCreateFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      type: undefined as unknown as LocationCreateFormValues["type"],
      services: [],
    },
  });

  return (
    <Card className=" w-full m-12 p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t("form.location_name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={i18n.t("form.location_name_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t("form.location_type")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={i18n.t("form.location_type_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t("form.location_services")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={i18n.t("form.location_services_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button>{i18n.t("form.submit")}</Button>
        </form>
      </Form>
    </Card>
  );
};
