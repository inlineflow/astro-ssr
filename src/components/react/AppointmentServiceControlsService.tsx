import { createContext, useContext, useState, type ReactNode } from "react";
import type { Employee, Service } from "src/lib/schema";

const SelectedEmployeeContext = createContext<{
  selectedEmployee: Employee;
  setSelectedEmployee: (emp: Employee) => void;
}>({
  selectedEmployee: {} as Employee,
  setSelectedEmployee: (_) => {},
});

export const SelectedEmployeeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState({} as Employee);
  const value = { selectedEmployee, setSelectedEmployee };

  return (
    <SelectedEmployeeContext.Provider value={value}>
      {children}
    </SelectedEmployeeContext.Provider>
  );
};

export const useSelectedEmployee = () => useContext(SelectedEmployeeContext);

const SelectedServiceContext = createContext<{
  selectedService: Service;
  setSelectedService: (serv: Service) => void;
}>({
  selectedService: {} as Service,
  setSelectedService: (_) => {},
});

export const SelectedServiceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedService, setSelectedService] = useState({} as Service);
  const value = { selectedService, setSelectedService };

  return (
    <SelectedServiceContext.Provider value={value}>
      {children}
    </SelectedServiceContext.Provider>
  );
};

export const useSelectedService = () => useContext(SelectedServiceContext);
