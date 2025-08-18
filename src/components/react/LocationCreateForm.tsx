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
import {
  LocationType,
  locationTypes,
  locationTypeToServices,
} from "src/lib/schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { keysOf } from "src/lib/utils";

const FormSchema = z.object({
  name: z.string().min(1, { message: i18n.t("form.location_name_empty") }),
  type: z.enum(locationTypes, {
    message: i18n.t("form.location_type_unknown"),
  }),
  services: z
    .array(z.string())
    .min(1, { message: i18n.t("form.services_empty") }),
  address: z.tuple([z.number(), z.number()], {
    message: i18n.t("form.location_address_empty"),
  }),
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
                  <LocationTypeCombobox
                    selectType={(slug: string) => field.onChange(slug)}
                  ></LocationTypeCombobox>
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
                  <LocationServicesCombobox
                    selectServices={(services: string[]) =>
                      field.onChange(services)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button onClick={() => console.log(form.getValues())}>
            {i18n.t("form.submit")}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

const LocationTypeCombobox = ({
  selectType,
}: {
  selectType: (slug: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [currentType, setCurrentType] = useState<string | undefined>();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", "")}
        >
          {currentType ?? i18n.t("form.pick_location_type")}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-72 p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput
            placeholder={i18n.t("form.location_type_placeholder")}
            className="h-9 w-fit"
          />
          <CommandList>
            <CommandEmpty>
              {i18n.t("form.pick_location_placeholder")}
            </CommandEmpty>
            <CommandGroup>
              {locationTypes.map((lt) => (
                <CommandItem
                  key={lt}
                  value={lt}
                  onSelect={(val) => {
                    console.log("val: ", val);
                    setCurrentType(val);
                    setOpen(false);
                    selectType(val);
                  }}
                >
                  {lt}
                  {/* consider fetching locataion type metadata to store location type value in location type picker */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const LocationServicesCombobox = ({
  selectServices,
}: {
  selectServices: (services: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [currentServices, setCurrentServices] = useState<string[]>([]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", "")}
        >
          {i18n.t("form.pick_location_services")}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-72 p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput
            placeholder={i18n.t("form.location_services_placeholder")}
            className="h-9 w-fit"
          />
          <CommandList>
            <CommandEmpty>
              {i18n.t("form.pick_location_placeholder")}
            </CommandEmpty>
            {keysOf(locationTypeToServices).map((lt) => (
              <CommandGroup heading={lt}>
                {locationTypeToServices[lt].map((s) => (
                  <CommandItem
                    key={s.serviceName}
                    value={s.serviceName}
                    className="ml-4"
                    onSelect={(val) => {
                      console.log("val: ", val);
                      setCurrentServices([...currentServices, val]);
                      // setOpen(false);
                      selectServices([...currentServices, val]);
                    }}
                  >
                    {s.serviceName}
                    {/* consider fetching locataion type metadata to store location type value in location type picker */}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
