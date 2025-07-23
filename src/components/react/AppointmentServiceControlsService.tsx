import { createContext, useContext, useState, type ReactNode } from "react";
import type { EmployeeView, ServiceView } from "src/lib/views";

const SelectedEmployeeContext = createContext<{
  selectedEmployee: EmployeeView;
  setSelectedEmployee: (emp: EmployeeView) => void;
}>({
  selectedEmployee: {},
  setSelectedEmployee: (_) => {},
});

export const SelectedEmployeeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeView>({});
  const value = { selectedEmployee, setSelectedEmployee };

  return (
    <SelectedEmployeeContext.Provider value={value}>
      {children}
    </SelectedEmployeeContext.Provider>
  );
};

export const useSelectedEmployee = () => useContext(SelectedEmployeeContext);

const SelectedServiceContext = createContext<{
  selectedService: ServiceView;
  setSelectedService: (serv: ServiceView) => void;
}>({
  selectedService: {},
  setSelectedService: (_) => {},
});

export const SelectedServiceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedService, setSelectedService] = useState<ServiceView>({});
  const value = { selectedService, setSelectedService };

  return (
    <SelectedServiceContext.Provider value={value}>
      {children}
    </SelectedServiceContext.Provider>
  );
};

export const useSelectedService = () => useContext(SelectedServiceContext);
