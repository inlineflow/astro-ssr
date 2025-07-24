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
import { Avatar, AvatarImage } from "@/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

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
                  } w-full h-fit max-w-full p-0 not-last:mb-2`}
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
  <div className="grid grid-cols-7 grid-rows-4 max-h-32 rounded-l-lg rounded-bl-lg ">
    <Avatar className="shrink-0 col-span-3 row-start-1 row-span-4 mx-auto rounded-none size-full rounded-l-lg rounded-bl-lg border-r-2 border-r-black/10">
      <AvatarImage
        src="https://64.media.tumblr.com/3c948972b7be8a79f1436393a3a26281/tumblr_ogw26dCy7A1smd799o1_1280.jpg"
        className="rounded-l-lg rounded-bl-lg"
      />
      <AvatarFallback>{employee.name.slice(0, 3)}</AvatarFallback>
    </Avatar>

    <div className="flex col-span-4 col-start-4 row-span-1 border-b-2 border-b-black/10 p-1 max-h-full items-center text-center">
      <p className="text-lg ml-3">{employee.name}</p>
    </div>
    <div className="flex flex-wrap col-span-4 col-start-4 row-start-2 row-span-3 mt-1  gap-[2px] p-2 max-h-full">
      {serviceStyles
        .filter((i) => employee.services.map((s) => s.tag).includes(i.tag))
        .map((ic) => (
          <div
            className={cn(
              [...commonContainerClasses, ...ic.classList, ic.bgColor].join(
                " "
              ),
              "size-8"
            )}
          >
            <ic.Icon className="size-6" color="black" />
          </div>
        ))}
    </div>
  </div>
  // <div className="grid grid-cols-3 items-center w-full h-full">
  //   {/* <div className="rounded-full bg-pink-200 size-16 shrink-0 col-span-1 row-start-1 row-span-2 mx-auto"></div> */}
  //   <Avatar className="shrink-0 col-span-1 row-start-1 row-span-2 mx-auto rounded-none size-16">
  //     <AvatarImage src="https://t3.ftcdn.net/jpg/02/58/89/90/360_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg" />
  //     <AvatarFallback>{employee.name.slice(0, 3)}</AvatarFallback>
  //   </Avatar>
  //   <p className="text-xl mb-auto row-span-1 row-start-1">{employee.name}</p>
  //   <div className="flex flex-wrap gap-1 col-span-2 col-start-2 row-start-2 row-span-2 mt-1">
  //     {serviceStyles
  //       .filter((i) => employee.services.map((s) => s.tag).includes(i.tag))
  //       .map((ic) => (
  //         <div
  //           className={[
  //             ...commonContainerClasses,
  //             ...ic.classList,
  //             ic.bgColor,
  //           ].join(" ")}
  //         >
  //           <ic.Icon className="size-6" color="black" />
  //         </div>
  //       ))}
  //   </div>
  // </div>
);
