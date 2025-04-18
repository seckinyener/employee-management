import { BehaviorSubject } from 'rxjs';

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

const employee$ = employeeSubject.asObservable();

const getState = () => {
    return employeeSubject.getValue();
}

const updateStore = (partial) => {
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

const addEmployee = (employee) => {
  const current = employeeSubject.getValue();
  const existingEmployees = [...current.employees];
  existingEmployees.push(employee);

  updateStore({
    employees: existingEmployees
  })
};

const updateEmployee = (updatedEmployee) => {
  const state = employeeSubject.getValue();
  const updatedEmployees = state.employees.map(emp =>
    emp.id === updatedEmployee.id ? updatedEmployee : emp
  );

  updateStore({
    employees: updatedEmployees
  })
};

const removeEmployee = (id) => {
  const employeeState = employeeSubject.getValue();
  const originalEmployeesAfterRemoval = employeeState.employees.filter(emp => emp.id !== id);

  const newPageSize = (employeeState.currentPage-1)*2;
  let newCurrentPage = employeeState.currentPage
  if(originalEmployeesAfterRemoval.length === newPageSize) {
    newCurrentPage--
  }

  updateStore({
    employees: originalEmployeesAfterRemoval,
    currentPage: newCurrentPage
  })
};

const getAllEmployees = () => {
  return employeeSubject.getValue().employees;
}

export default {
  employee$,
  getAllEmployees,
  removeEmployee,
  updateEmployee,
  addEmployee,
  updateStore,
  getState
}
