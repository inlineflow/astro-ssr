import { createContext } from "react";
import type { Employee, Service } from "src/lib/schema";

const EmployeesContext = createContext<{ employees: Employee[] }>({
  employees: [],
});

const ServicesContext = createContext<{ services: Service[] }>({
  services: [],
});

// const UseEmployeesContext =
