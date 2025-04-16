import { BehaviorSubject } from 'rxjs';

const initialState = [
  {
    id: 1,
    firstName: "string",
    lastName: "string",
    dateOfEmployment: "string",
    dateOfBirth: "string",
    phone: "string",
    email: "string",
    department: "string",
    position: "string"
  },
  {
    id: 2,
    firstName: "seckin",
    lastName: "string",
    dateOfEmployment: "string",
    dateOfBirth: "string",
    phone: "string",
    email: "string",
    department: "string",
    position: "string"
  },
  {
    id: 3,
    firstName: "string",
    lastName: "string",
    dateOfEmployment: "string",
    dateOfBirth: "string",
    phone: "string",
    email: "string",
    department: "string",
    position: "string"
  }
];

const employeeSubject = new BehaviorSubject(initialState);

export const employee$ = employeeSubject.asObservable();

export const setEmployee = (employees) => {
  employeeSubject.next(employees);
};

export const addEmployee = (employee) => {
  const current = employeeSubject.getValue();
  employeeSubject.next([...current, employee]);
};

export const updateEmployee = (updatedEmployee) => {
  const current = employeeSubject.getValue();
  const updated = current.map(emp => 
    emp.id === updatedEmployee.id ? updatedEmployee : emp
  );
  employeeSubject.next(updated);
};

export const removeEmployee = (id) => {
  const current = employeeSubject.getValue();
  const filtered = current.filter(emp => emp.id !== id);
  employeeSubject.next(filtered);
};
