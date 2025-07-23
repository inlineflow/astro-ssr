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
} from "./AppointmentServiceControlsService";

type Props = {
  services: Service[];
  selectedServiceId: string;
  onSelect: (newEmployeeId: string) => void;
};

export const ServicePicker = ({
  selectedServiceId,
  onSelect,
  services,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { selectedEmployee } = useSelectedEmployee();
  const { setSelectedService } = useSelectedService();
  const currentService = services.find(
    (x) => x.serviceId === selectedServiceId
  );
  const availableServices = services.map((s) => ({
    ...s,
    availableForSelectedEmployee: Object.hasOwn(
      selectedEmployee,
      "providesServices"
    )
      ? selectedEmployee.providesServices?.includes(s.serviceId)
      : true,
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
                      : "opacity-50"
                  )}
                  disabled={!service.availableForSelectedEmployee}
                >
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
