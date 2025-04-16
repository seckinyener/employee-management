import { BehaviorSubject } from 'rxjs';

const dummyEmployees = [
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

const initialState = {
    employees: [],
    filteredEmployees: [],
    currentPage: 1,
    pageSize: 2,
    searchQuery: ''
}

const loadFromStorage = () => {
  const stored = localStorage.getItem('employeeStore');
  return stored ? JSON.parse(stored) : initialState;
};

const employeeSubject = new BehaviorSubject(loadFromStorage());

export const employee$ = employeeSubject.asObservable();

export const getState = () => {
    return employeeSubject.getValue();
}

export const updateStore = (partial) => {
    const current = employeeSubject.getValue();
    const nextState = {...current, ...partial};

    if(partial.employees || nextState.searchQuery) {
        nextState.filteredEmployees = nextState.searchQuery ? nextState.employees.filter(emp =>
            Object.values(emp).some(val =>
              val?.toString().toLowerCase().includes(nextState.searchQuery)
            )
          ) : nextState.employees
    }
    employeeSubject.next(nextState);
    localStorage.setItem('employeeStore', JSON.stringify(nextState));
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
  const originalEmployeesAfterRemoval = current.employees.filter(emp => emp.id !== id);

  updateStore({
    employees: originalEmployeesAfterRemoval,
  })
};

export const getAllEmployees = () => {
  return employeeSubject.getValue().employees;
}
