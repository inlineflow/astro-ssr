import type { Employee, Service } from "src/lib/schema";
import { ServicePicker } from "./ServicePicker";
import { EmployeePicker } from "./EmployeePicker";
import { useFormField } from "@/ui/form";
import { cn } from "@/lib/utils";
import { type FieldErrors } from "react-hook-form";
import type { AppointmentFormValues } from "./AppointmentForm";
import {
  SelectedEmployeeProvider,
  SelectedServiceProvider,
  useSelectedEmployee,
  useSelectedService,
} from "./AppointmentServiceControlsService";

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
      <SelectedEmployeeProvider>
        <SelectedServiceProvider>
          <div>
            <EmployeePicker
              employees={employees}
              onSelect={onSelectEmployee}
              selectedEmployeeId={selectedEmployeeId}
            />
            <EmployeeErrorMessage />
          </div>
          <div>
            <ServicePicker
              services={services}
              selectedName={selectedServiceId}
              onSelect={onSelectService}
            />
            <ServiceErrorMessage />
          </div>
        </SelectedServiceProvider>
      </SelectedEmployeeProvider>
    </div>
  );
};

type AppointmentFormErrors = FieldErrors<AppointmentFormValues>;

export const ServiceErrorMessage = () => {
  const { error, formMessageId } = useFormField();
  if (!error) {
    return null;
  }

  const err = (error as AppointmentFormErrors["serviceOpts"])!["serviceId"];

  const body = String(err?.message ?? "");

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", "")}
    >
      {body}
    </p>
  );
};

export const EmployeeErrorMessage = () => {
  const { error, formMessageId } = useFormField();
  if (!error) {
    return null;
  }

  const err = (error as AppointmentFormErrors["serviceOpts"])!["employeeId"];

  const body = String(err?.message ?? "");

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", "")}
    >
      {body}
    </p>
  );
};
