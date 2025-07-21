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
import type { Service } from "src/lib/schema";

type Props = {
  services: Service[];
  selectedId: string;
  onSelect: (newEmployeeId: string) => void;
};

export const ServicePicker = ({ selectedId, onSelect, services }: Props) => {
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
            ? services.find((s) => s.serviceId === selectedId)?.name
            : "Select employee..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search service..." className="h-9" />
          <CommandList>
            <CommandEmpty>Процедура не найдена.</CommandEmpty>
            <CommandGroup>
              {services.map((service) => (
                <CommandItem
                  key={service.serviceId}
                  value={service.serviceId}
                  onSelect={(currentId) => {
                    onSelect(currentId === selectedId ? "" : currentId);
                    setOpen(false);
                  }}
                >
                  {service.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedId === service.serviceId
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
