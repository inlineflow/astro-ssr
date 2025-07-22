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

type Props = {
  employees: Employee[];
  selectedId: string;
  onSelect: (newEmployeeId: string) => void;
};

export const EmployeePicker = ({ selectedId, onSelect, employees }: Props) => {
  const [open, setOpen] = useState(false);
  //   const [id, setId] = useState();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedId
            ? employees.find((e) => e.employeeId === selectedId)?.name
            : "Выберите мастера..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Выберите мастера" className="h-9" />
          <CommandList>
            <CommandEmpty>Процедура не найдена.</CommandEmpty>
            <CommandGroup>
              {employees.map((employee) => (
                <CommandItem
                  key={employee.employeeId}
                  value={employee.employeeId}
                  onSelect={(currentId) => {
                    onSelect(currentId === selectedId ? "" : currentId);
                    setOpen(false);
                  }}
                >
                  <div className="inline rounded-full bg-pink-200 size-12"></div>
                  <div>{employee.name}</div>
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedId === employee.employeeId
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
