import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import type { Employee, Service } from "src/lib/schema";
import {
  useSelectedEmployee,
  useSelectedService,
} from "./AppointmentServiceControlsContext";
import { serviceStyles } from "src/lib/icons";

type Props = {
  services: Service[];
  selectedServiceId: string;
  onSelect: (newEmployeeId: string) => void;
  employees?: Employee[];
};

export const ServicePicker = ({
  selectedServiceId,
  onSelect,
  services,
  employees,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { selectedEmployee } = useSelectedEmployee();
  const { setSelectedService } = useSelectedService();
  const currentService = services.find(
    (x) => x.serviceId === selectedServiceId
  );
  const availableServices = services.map((s) => ({
    ...s,
    availableForSelectedEmployee:
      "services" in selectedEmployee
        ? selectedEmployee.services
            .map((x) => x.serviceId)
            .includes(s.serviceId)
        : // ? selectedEmployee.services?.map((x) => x.serviceId === s.serviceId)
          true,
    styles: serviceStyles.find((x) => x.tag === s.tag),
    employees: employees?.filter((e) =>
      e.providesServices.includes(s.serviceId)
    ),
    // bgColor: serviceStyles.filter((x) => x.tag === s.tag).map((y) => y.bgColor),
  }));
  console.log("selected employee: ", selectedEmployee);
  console.log("available services: ", availableServices);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedServiceId ? currentService?.name : "Выберите процедуру..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Выберите процедуру..." className="h-9" />
          <CommandList>
            <CommandEmpty>Процедура не найдена.</CommandEmpty>
            <CommandGroup>
              {availableServices.map((service) => (
                <CommandItem
                  keywords={
                    service.employees
                      ? service.employees?.map((e) => e.name)
                      : []
                  }
                  key={service.serviceId}
                  value={service.name}
                  onSelect={(currentName) => {
                    setSelectedService(
                      currentName === currentService?.name
                        ? ({} as Service)
                        : services.find((x) => x.name === currentName)!
                    );
                    onSelect(
                      currentName === currentService?.name
                        ? ""
                        : services.find((x) => x.name === currentName)
                            ?.serviceId!
                      // currentName === selectedServiceId ? "" : currentName
                    );
                    setOpen(false);
                  }}
                  className={cn(
                    service.availableForSelectedEmployee
                      ? "opacity-100"
                      : "opacity-50",
                    service.styles?.bgColor,
                    // `${service.styles!.bgColor}/70`,
                    // `data-[selected=true]:${service.styles?.bgColor}`,
                    service.styles?.bgHighlight
                  )}
                  disabled={!service.availableForSelectedEmployee}
                >
                  {service.styles && <service.styles.Icon />}
                  {service.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedServiceId === service.serviceId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
