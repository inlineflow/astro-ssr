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

const FormSchema = z
  .object({
    email: z
      .email({ message: i18n.t("form.email_invalid") })
      .nonempty({ message: i18n.t("form.email_empty") }),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t("form.passwords_dont_match"),
    path: ["confirmPassword"],
  });

type BusinessLoginFormValues = z.infer<typeof FormSchema>;
const onSubmit = async (data: BusinessLoginFormValues) => {
  console.log(data);
};

export const BusinessLoginForm = () => {
  const form = useForm<BusinessLoginFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t("form.password")}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t("form.confirm_password")}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <a
            href={`/${i18n.language}/business-login`}
            className="underline underline-offset-4"
          >
            {i18n.t("form.business_signup_signin")}
          </a>
          <Button>{i18n.t("form.submit")}</Button>
        </form>
      </Form>
    </Card>
  );
};
