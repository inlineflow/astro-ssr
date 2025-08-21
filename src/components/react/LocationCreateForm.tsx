import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "src/data-fetching/store";
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
  type LocationMetadata,
  type NominatimData,
} from "src/lib/schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { MapComponent } from "./MapComponent";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { actions } from "astro:actions";
import { Spinner } from "@/ui/spinner";
import type { LeafletMouseEvent } from "leaflet";

const FormSchema = z.object({
  name: z.string().min(1, { message: i18n.t("form.location_name_empty") }),
  type: z.enum(locationTypes, {
    message: i18n.t("form.location_type_unknown"),
  }),
  services: z
    .array(
      z.object({
        serviceId: z.uuid(),
        serviceName: z.string(),
      })
    )
    .min(1, { message: i18n.t("form.services_empty") }),
  address: z.tuple([z.number(), z.number()], {
    message: i18n.t("form.location_address_empty"),
  }),
});

type LocationCreateFormValues = z.infer<typeof FormSchema>;
const onSubmit = async (data: LocationCreateFormValues) => {
  console.log("onSubmit data: ", data);
  const { data: resp, error } = await actions.nominatim.lookupByLatLng(
    data.address
  );
  if (error) {
    console.log("error when fetching street name: ", error);
    return;
  }

  console.log("response: ", resp);
};

const onError = async (data: any) => {
  console.log("onError data: ", data);
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

  const services = keysOf(locationTypeToServices).reduce<
    Record<
      LocationType,
      (LocationMetadata & { selected: boolean; serviceId: string })[]
    >
  >((acc, key) => {
    acc[key] = locationTypeToServices[key].map((val) => ({
      ...val,
      selected: false,
      serviceId: crypto.randomUUID(),
    }));
    return acc;
  }, {} as Record<LocationType, (LocationMetadata & { selected: boolean; serviceId: string })[]>);
  console.log("services: ", services);

  return (
    <Card className=" w-full m-12 p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
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
                    services={services}
                    selectServices={(services) => field.onChange(services)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.t("form.location_address")}</FormLabel>
                <FormControl>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        {i18n.t("form.pick_address")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>New address</DialogTitle>
                        <DialogDescription>Pick an address.</DialogDescription>
                      </DialogHeader>
                      <MapContent
                        selectLocation={(val) => field.onChange(val)}
                        withAddress
                      />
                      {/* <MapComponent
                        selectLocation={(val) => field.onChange(val)}
                        withAddress
                      /> */}
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">{i18n.t("close")}</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
  services,
}: {
  selectServices: (
    data: Array<{ serviceId: string; serviceName: string }>
    // services: Record<
    //   LocationType,
    //   (LocationMetadata & { selected: boolean; serviceId: string })[]
    // >
  ) => void;
  services: Record<
    LocationType,
    (LocationMetadata & { selected: boolean; serviceId: string })[]
  >;
}) => {
  const [open, setOpen] = useState(false);
  const [currentServices, setCurrentServices] = useState(services);
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
            {keysOf(currentServices).map((lt) => (
              <CommandGroup heading={lt}>
                {currentServices[lt].map((s) => (
                  <CommandItem
                    key={s.serviceName}
                    // value={`${lt}|${s}` as `${LocationType}|${string}`}
                    value={s.serviceId}
                    keywords={[s.serviceName, lt]}
                    className="ml-4"
                    onSelect={(serviceId) => {
                      const localServices = {
                        ...currentServices,
                        [lt]: currentServices[lt].map((serv) =>
                          serv.serviceId === serviceId
                            ? { ...serv, selected: !serv.selected }
                            : serv
                        ),
                        // [lt]: [
                        //   ...services[lt],
                        //   {
                        //     ...services[lt].find(
                        //       (s) => s.serviceId === serviceId
                        //     ),
                        //     selected: true,
                        //   },
                        // ],
                      };
                      console.log("localServices in form: ", localServices);
                      console.log("selected service: ", serviceId);
                      setCurrentServices(localServices);
                      // setOpen(false);
                      const selectedServices = localServices[lt]
                        .filter((serv) => serv.selected)
                        .map((serv) => ({
                          serviceId: serv.serviceId,
                          serviceName: serv.serviceName,
                        }));
                      selectServices(selectedServices);
                    }}
                  >
                    {s.serviceName}
                    <Check
                      className={`transition-opacity ease-in-out delay-150 duration-300 ${
                        s.selected ? "opacity-100" : "opacity-0"
                      }`}
                    />
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

type FetchError = string;
const MapContent = ({
  selectLocation,
  withAddress,
}: {
  selectLocation: (location: [number, number]) => void;
  withAddress: boolean;
}) => {
  const [location, setLocation] = useState<[number, number]>([
    42.8703, 74.6116,
  ]);
  const { data, isFetching, error } = useQuery(
    {
      queryKey: ["address", location],
      queryFn: async ({ queryKey }) =>
        await actions.nominatim.lookupByLatLng(queryKey[1] as [number, number]),
    },
    queryClient
  );
  return (
    <div>
      <MapComponent
        withAddress={withAddress}
        onClick={(e: LeafletMouseEvent) => {
          setLocation([e.latlng.lat, e.latlng.lng]);
        }}
        markerLocation={location}
      />
      <div className="flex items-center justify-center">
        {withAddress && !isFetching && typeof data === "string" && (
          <p className="text-center">{`Error: ${data}`}</p>
        )}
        {withAddress && !isFetching && typeof data !== "string" && data && (
          <p className="text-center">{`${data.data?.address.road}`}</p>
        )}
        {isFetching && <Spinner variant="bars" />}
      </div>
    </div>
  );
};
