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

const FormSchema = z.object({
  name: z.string().nonempty({ message: i18n.t("form.brand_name_empty") }),
  description: z.string(),
  email: z.email({ message: i18n.t("form.email_invalid") })
    .nonempty({ message: i18n.t("form.email_empty") }),
  phone_number: z.string().nonempty({ message: i18n.t("form.phone_empty") })
});

type BusinessSignUpFormValues = z.infer<typeof FormSchema>;
const onSubmit = async (data: BusinessSignUpFormValues) => {
  console.log(data);
}

export const BusinessSignUpForm = () => {
  const form = useForm<BusinessSignUpFormValues>(
    {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 w-full items-center justify-center space-y-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{i18n.t("form.business_name")}</FormLabel>
              <FormControl>
                <Input placeholder={i18n.t("form.business_name_placeholder")} {...field} />
              </FormControl>
            </FormItem>
          )}>
        </FormField>
      </form>
    </Form >
  );
}
