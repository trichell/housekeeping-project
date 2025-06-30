export type Employee = {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  price: string;
  group: string;
};

let employees: Employee[] = [
  { id: 'HSK-001', name: 'JERRY', gender: 'Female', price: 'Rp100.000 / Day', group: 'Housekeeping Employee' },
  { id: 'HSK-002', name: 'JERRY', gender: 'Female', price: 'Rp120.000 / Day', group: 'Housekeeping Employee' },
  { id: 'HSK-003', name: 'JERRY', gender: 'Female', price: 'Rp90.000 / Day', group: 'Housekeeping Employee' },
  { id: 'HSK-004', name: 'JERRY', gender: 'Female', price: 'Rp110.000 / Day', group: 'Housekeeping Employee' },

  { id: 'PET-001', name: 'JERRY', gender: 'Female', price: 'Rp95.000 / Hour', group: 'Pet Caretaker Employee' },
  { id: 'BYS-001', name: 'VJERRY', gender: 'Female', price: 'Rp80.000 / Hour', group: 'Babysitter Employee' },
  { id: 'SEC-001', name: 'JERRY', gender: 'Male', price: 'Rp150.000 / Day', group: 'Security Employee' },
  { id: 'MOV-001', name: 'JERRY', gender: 'Male', price: 'Rp160.000 / Day', group: 'Movers Employee' },
];

export const getEmployees = (group: string) => {
  return employees.filter((e) => e.group === group);
};

const groupPrefix = (group: string) => {
  if (group.includes('Housekeeping')) return 'HSK';
  if (group.includes('Pet')) return 'PET';
  if (group.includes('Babysitter')) return 'BYS';
  if (group.includes('Security')) return 'SEC';
  if (group.includes('Movers')) return 'MOV';
  return 'EMP';
};

export const addEmployee = (employee: Omit<Employee, 'id'>) => {
  const currentGroup = employees.filter((e) => e.group === employee.group);
  const prefix = groupPrefix(employee.group);
  const nextNumber = currentGroup.length + 1;
  const newId = `${prefix}-${String(nextNumber).padStart(3, '0')}`;
  employees.push({ id: newId, ...employee });
};

export const updateEmployee = (id: string, updated: Partial<Employee>) => {
  employees = employees.map((e) => (e.id === id ? { ...e, ...updated } : e));
};

export const deleteEmployee = (id: string) => {
  employees = employees.filter((e) => e.id !== id);
};