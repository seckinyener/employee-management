import { BehaviorSubject } from 'rxjs';

const initialState = {
    employees: [
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
    ]
}

const employeeSubject = new BehaviorSubject(initialState);

export const employee$ = employeeSubject.asObservable();

export const updateStore = (partial) => {
    const current = employeeSubject.getValue();
    employeeSubject.next({ ...current, ...partial });
};

export const addEmployee = (employee) => {
  const current = employeeSubject.getValue();
  const existingEmployees = [...current.employees];
  existingEmployees.push(employee);
  updateStore({
    employees: existingEmployees
  })
};

export const updateEmployee = (updatedEmployee) => {
  const state = employeeSubject.getValue();
  const updatedEmployees = state.employees.map(emp =>
    emp.id === updatedEmployee.id ? updatedEmployee : emp
  );
  updateStore({
    employees: updatedEmployees
  })
};

export const removeEmployee = (id) => {
  const current = employeeSubject.getValue();
  const filtered = current.employees.filter(emp => emp.id !== id);
  employeeSubject.next(filtered);
  updateStore({
    employees: filtered
  })
};
