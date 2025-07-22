import type { Employee, Service } from "src/lib/schema";
import { ServicePicker } from "./ServicePicker";
import { EmployeePicker } from "./EmployeePicker";
import { useFormField } from "@/ui/form";
import { cn } from "@/lib/utils";
import { type FieldErrors } from "react-hook-form";
import type { AppointmentFormValues } from "./AppointmentForm";

type Props = {
  employees: Employee[];
  services: Service[];
  selectedEmployeeId: string;
  selectedServiceId: string;
  onSelectService: (id: string) => void;
  onSelectEmployee: (id: string) => void;
};

export const AppointmentServiceControls = ({
  employees,
  services,
  selectedEmployeeId,
  selectedServiceId,
  onSelectService,
  onSelectEmployee,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:justify-between">
      <ServicePicker
        services={services}
        selectedId={selectedServiceId}
        onSelect={onSelectService}
      />
      <EmployeePicker
        employees={employees}
        onSelect={onSelectEmployee}
        selectedId={selectedEmployeeId}
      />
    </div>
  );
};

type AppointmentFormErrors = FieldErrors<AppointmentFormValues>;

export const ServiceErrorMessage = () => {
  const { error, formMessageId } = useFormField();
  if (!error) {
    return null;
  }

  const optsErrors = error as AppointmentFormErrors["serviceOpts"];

  return (
    <div className="flex justify-between">
      <p
        data-slot="form-message"
        id={formMessageId}
        className={cn("text-destructive text-sm", "")}
      >
        {optsErrors?.employeeId?.message ?? ""}
      </p>
      <p
        data-slot="form-message"
        id={formMessageId}
        className={cn("text-destructive text-sm", "")}
      >
        {optsErrors?.serviceId?.message ?? ""}
      </p>
    </div>
  );
};
