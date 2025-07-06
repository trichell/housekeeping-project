export type Employee = {
  id: string;
  custom_id: string; 
  name: string;
  gender: 'Male' | 'Female';
  price: string;
  group: string;
};

const BASE_URL = 'http://localhost:3001/api/employees';

export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
const json = await response.json();

return json.data;
}

export async function addEmployee(data: Omit<Employee, 'id'>){
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({employee: data}),
  });

  if (!response.ok) {
    throw new Error('Failed to add employee');
  }

  return response.json();
}

export async function updateEmployee(id: string, data: Partial<Employee>) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update employee');
  }

  return response.json();
}

export async function deleteEmployee(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete employee');
  }

  return response.json();
}