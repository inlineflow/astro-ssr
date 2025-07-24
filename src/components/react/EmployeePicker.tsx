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
import {
  useSelectedEmployee,
  useSelectedService,
} from "./AppointmentServiceControlsContext";
import type { EmployeeView } from "src/lib/views";
import { commonContainerClasses, serviceStyles } from "src/lib/icons";

type Props = {
  employees: EmployeeView[];
  selectedEmployeeId: string;
  onSelect: (currentEmpName: string) => void;
  // className: string;
};

export const EmployeePicker = ({
  selectedEmployeeId,
  onSelect,
  employees,
}: // className,
Props) => {
  const [open, setOpen] = useState(false);
  const { setSelectedEmployee } = useSelectedEmployee();
  const { selectedService } = useSelectedService();
  const currentEmployee = employees.find(
    (e) => e.employeeId === selectedEmployeeId
  );

  const availableEmployees = employees!.map((emp) => ({
    ...emp!,
    availableForSelectedService:
      "serviceId" in selectedService
        ? emp.services.map((s) => s.serviceId === selectedService.serviceId)
        : true,
  }));

  console.log("selected service: ", selectedService);
  console.log("available employees: ", availableEmployees);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", "")}
        >
          {selectedEmployeeId ? currentEmployee?.name : "Выберите мастера..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-72 p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder="Выберите мастера" className="h-9 w-fit" />
          <CommandList>
            <CommandEmpty>Мастер не найден.</CommandEmpty>
            <CommandGroup>
              {availableEmployees.map((employee) => (
                <CommandItem
                  key={employee.employeeId}
                  value={employee.name}
                  keywords={employee.services.map((s) => s.name)}
                  onSelect={(currentEmpName) => {
                    setSelectedEmployee(
                      currentEmpName === currentEmployee?.name
                        ? ({} as EmployeeView)
                        : employees.find((x) => x.name === currentEmpName)!
                    );
                    onSelect(
                      currentEmpName === currentEmployee?.name
                        ? ""
                        : employees.find((x) => x.name === currentEmpName)
                            ?.employeeId!
                    );
                    setOpen(false);
                  }}
                  className={`${
                    employee.availableForSelectedService
                      ? "opacity-100"
                      : "opacity-50"
                  } w-full h-fit max-w-full`}
                  disabled={!employee.availableForSelectedService}
                >
                  <EmployeePickerCard employee={employee} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const EmployeePickerCard = ({ employee }: { employee: EmployeeView }) => (
  <div className="grid grid-cols-3 items-center w-full h-full">
    <div className="rounded-full bg-pink-200 size-16 shrink-0 col-span-1 row-start-1 row-span-2 mx-auto"></div>
    <p className="text-xl mb-auto row-span-1 row-start-1">{employee.name}</p>
    <div className="flex flex-wrap gap-1 col-span-2 col-start-2 row-start-2 row-span-2 mt-1">
      {serviceStyles
        .filter((i) => employee.services.map((s) => s.tag).includes(i.tag))
        .map((ic) => (
          <div
            className={[
              ...commonContainerClasses,
              ...ic.classList,
              ic.bgColor,
            ].join(" ")}
          >
            <ic.Icon className="size-6" color="black" />
          </div>
        ))}
    </div>
  </div>
);
