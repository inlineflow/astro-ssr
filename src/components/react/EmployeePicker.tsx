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
import type { Employee } from "src/lib/schema";
import {
  useSelectedEmployee,
  useSelectedService,
} from "./AppointmentServiceControlsService";

type Props = {
  employees: Employee[];
  selectedEmployeeId: string;
  onSelect: (currentEmpName: string) => void;
};

export const EmployeePicker = ({
  selectedEmployeeId,
  onSelect,
  employees,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { setSelectedEmployee } = useSelectedEmployee();
  const { selectedService } = useSelectedService();
  const currentEmployee = employees.find(
    (e) => e.employeeId === selectedEmployeeId
  );
  const availableEmployees = employees.map((emp) => ({
    ...emp,
    availableForSelectedService: Object.hasOwn(selectedService, "serviceId")
      ? emp.providesServices.includes(selectedService.serviceId)
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
          className="w-[200px] justify-between"
        >
          {selectedEmployeeId ? currentEmployee?.name : "Выберите мастера..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Выберите мастера" className="h-9" />
          <CommandList>
            <CommandEmpty>Мастер не найден.</CommandEmpty>
            <CommandGroup>
              {availableEmployees.map((employee) => (
                <CommandItem
                  key={employee.employeeId}
                  value={employee.name}
                  onSelect={(currentEmpName) => {
                    setSelectedEmployee(
                      currentEmpName === currentEmployee?.name
                        ? {}
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
                  className={
                    employee.availableForSelectedService
                      ? "opacity-100"
                      : "opacity-50"
                  }
                  disabled={!employee.availableForSelectedService}
                >
                  <div className="inline rounded-full bg-pink-200 size-8"></div>
                  <div>{employee.name}</div>

                  <Check
                    className={cn(
                      "ml-auto",
                      selectedEmployeeId === employee.employeeId
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
