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

const FormSchema = z.object({
  name: z.string().nonempty({ message: i18n.t("form.brand_name_empty") }),
  description: z.string(),
  email: z
    .email({ message: i18n.t("form.email_invalid") })
    .nonempty({ message: i18n.t("form.email_empty") }),
  phone_number: z.string().nonempty({ message: i18n.t("form.phone_empty") }),
});

type BusinessSignUpFormValues = z.infer<typeof FormSchema>;
const onSubmit = async (data: BusinessSignUpFormValues) => {
  console.log(data);
};

export const BusinessSignUpForm = () => {
  const form = useForm<BusinessSignUpFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      email: "",
      name: "",
      phone_number: "",
    },
  });

  // return (<p>Hello from form</p>);

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
                <FormLabel>{i18n.t("form.brand_name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={i18n.t("form.brand_name_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t("form.brand_email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={i18n.t("form.brand_email_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t("form.phone_number")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={i18n.t("form.phone_number_placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {i18n.t("form.business_description.optional")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={i18n.t("form.business_description")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <a
            href={`/${i18n.language}/business-login`}
            className="underline underline-offset-4 text-sm"
          >
            {i18n.t("form.business_signup_signin")}
          </a>
          <Button>{i18n.t("form.submit")}</Button>
        </form>
      </Form>
    </Card>
  );
};
