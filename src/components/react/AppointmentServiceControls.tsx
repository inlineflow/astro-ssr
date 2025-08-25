import type { Employee, Service } from "src/lib/schema";
import { ServicePicker } from "./ServicePicker";
import { EmployeePicker } from "./EmployeePicker";
import { useFormField } from "@/ui/form";
import { cn } from "@/lib/utils";
import { type FieldErrors } from "react-hook-form";
import type { AppointmentFormValues } from "src/lib/schema";
import {
  SelectedEmployeeProvider,
  // SelectedServiceProvider,
} from "./AppointmentServiceControlsContext";

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
  const empViews = employees.map((emp) => ({
    ...emp,
    services: services.filter((s) =>
      emp.providesServices.includes(s.serviceId)
    ),
  }));

  return (
    <div className="flex flex-col gap-5 md:flex-row md:justify-between md:grid md:grid-cols-5">
      <SelectedEmployeeProvider>
        <div className="md:col-span-2">
          <EmployeePicker
            employees={empViews}
            onSelect={onSelectEmployee}
            selectedEmployeeId={selectedEmployeeId}
          />
          <EmployeeErrorMessage />
        </div>
        <div className="md:col-span-3">
          <ServicePicker
            employees={employees}
            services={services}
            selectedServiceId={selectedServiceId}
            onSelect={onSelectService}
          />
          <ServiceErrorMessage />
        </div>
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
