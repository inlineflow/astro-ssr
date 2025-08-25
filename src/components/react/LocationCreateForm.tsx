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
import {
  useForm,
  useFormState,
  type DefaultValues,
  type FieldErrors,
} from "react-hook-form";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import {
  LocationCreateFormSchema,
  LocationType,
  locationTypes,
  locationTypeToServices,
  type Location,
  type LocationCreateFormValues,
  type LocationMetadata,
  type NominatimData,
} from "src/lib/schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useEffect, useState } from "react";
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
import { extractUUID } from "src/browser/browser";
import { toast } from "sonner";
import { Label } from "@/ui/label";

const onSubmit = async (data: LocationCreateFormValues) => {
  console.log("onSubmit data: ", data);
  const brandId = extractUUID(window.location.href, "brand");
  if (!brandId) {
    console.log(
      `error, couldn't pass brandId in the url: ${window.location.href}`
    );
    return;
  }
  const { data: postData, error } = await actions.location.postLocation({
    data,
    brandId: brandId,
  });
  if (!error) {
    console.log("response: ", postData);
    toast.success(postData.message);
    // setTimeout(() => {
    //   window.location.href = `/${i18n.language}/brand/${brandId}/dashboard`;
    // }, 300);
  }
};

const onError = async (data: FieldErrors<LocationCreateFormValues>) => {
  console.log(data);
};

const defaults: DefaultValues<LocationCreateFormValues> = {
  geodata: {},
  name: "",
  services: [],
  type: [],
  // type: undefined as unknown as LocationCreateFormValues["type"],
};

export const LocationCreateForm = ({ location }: { location?: Location }) => {
  const form = useForm<LocationCreateFormValues>({
    resolver: zodResolver(LocationCreateFormSchema),
    defaultValues: location
      ? {
          name: location.name,
          type: location.locationTypes,
          services: location.services,
          geodata: location.geodata,
        }
      : defaults,
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
  // console.log("services: ", services);

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
                    selectTypes={(types: LocationType[]) =>
                      field.onChange(types)
                    }
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
            name="geodata"
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
                        <DialogTitle>
                          {i18n.t("form.address.dialog_title")}
                        </DialogTitle>
                        {/* <DialogDescription>
                          {i18n.t("form.address.pick_an_address")}
                        </DialogDescription> */}
                      </DialogHeader>
                      <MapContent
                        setGeodataField={(val) => field.onChange(val)}
                        center={[
                          Number(location?.geodata.lat),
                          Number(location?.geodata.lon),
                        ]}
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
          <Button type="submit">{i18n.t("form.submit")}</Button>
        </form>
      </Form>
    </Card>
  );
};

const LocationTypeCombobox = ({
  selectTypes,
}: {
  selectTypes: (types: LocationType[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  // const [currentType, setCurrentType] = useState<string | undefined>();
  const [currentTypes, setCurrentTypes] = useState(
    locationTypes.map((lt) => ({ type: lt, selected: false }))
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", "")}
        >
          {currentTypes.filter((ct) => ct.selected).length > 0
            ? `${currentTypes.filter((ct) => ct.selected).length} selected`
            : i18n.t("form.pick_location_type")}
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
              {currentTypes.map((t) => (
                <CommandItem
                  key={t.type}
                  value={t.type}
                  onSelect={(val) => {
                    console.log("val: ", val);
                    // setCurrentType(val);
                    const localTypes = currentTypes.map((ct) =>
                      ct.type === val ? { ...ct, selected: !ct.selected } : ct
                    );
                    setCurrentTypes(localTypes);
                    selectTypes(
                      localTypes.filter((lt) => lt.selected).map((t) => t.type)
                    );
                  }}
                >
                  {t.type}
                  <Check
                    className={`transition-opacity ease-in-out delay-150 duration-300 ${
                      t.selected ? "opacity-100" : "opacity-0"
                    }`}
                  />
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
                      };
                      console.log("localServices in form: ", localServices);
                      console.log("selected service: ", serviceId);
                      setCurrentServices(localServices);
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

const MapContent = ({
  setGeodataField,
  withAddress,
  center,
}: {
  setGeodataField: (data: NominatimData) => void;
  center?: [number, number];
  withAddress: boolean;
}) => {
  const [location, setLocation] = useState<[number, number]>(
    center ?? [42.8703, 74.6116]
  );
  const {
    data: resp,
    isFetching,
    error,
  } = useQuery(
    {
      queryKey: ["address", location],
      queryFn: async ({ queryKey }) =>
        await actions.nominatim.lookupByLatLng(queryKey[1] as [number, number]),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
    queryClient
  );

  const [userLabel, setUserLabel] = useState("");

  useEffect(() => {
    if (resp && resp.data) {
      console.log("refetched resp: ", resp.data);
      const result: NominatimData = {
        lat: resp.data.lat,
        lon: resp.data.lon,
        address: resp.data.address,
        user_label: userLabel,
      };
      setGeodataField(result);
    }
  }, [resp]);

  return (
    <div className="flex flex-col gap-3 items-center text-center">
      <MapComponent
        withAddress={withAddress}
        onClick={(e: LeafletMouseEvent) => {
          setLocation([e.latlng.lat, e.latlng.lng]);
          // selectLocation([e.latlng.lat, e.latlng.lng]);
        }}
        markerLocation={location}
      />
      {withAddress && (
        <div className="flex items-center justify-center">
          {!isFetching && (resp?.error || error) && (
            <p className="text-center">{`Error: ${
              resp?.error ? resp.error.message : error?.message
            }`}</p>
          )}
          {!isFetching && resp?.data && (
            <p className="text-center">{`${resp.data?.address.road} ${resp.data.address.house_number}`}</p>
          )}
          {isFetching && <Spinner variant="bars" />}
        </div>
      )}
      <p className="text-sm">{i18n.t("form.address.user_label_disclaimer")}</p>
      <div className="items-center w-64">
        <Label htmlFor="address.user_label">
          {i18n.t("form.address.user_label.optional")}
        </Label>
        <Input
          id="address.user_label"
          value={userLabel}
          onChange={(e) => setUserLabel(e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};
