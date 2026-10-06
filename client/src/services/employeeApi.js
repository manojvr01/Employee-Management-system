import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all employees (with optional search & department filter)
export const getEmployees = async (search = '', department = '') => {
  const params = {};
  if (search.trim()) params.search = search.trim();
  if (department.trim()) params.department = department.trim();
  const response = await api.get('/employees', { params });
  return response.data;
};

// Get a single employee by ID
export const getEmployee = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

// Create a new employee
export const createEmployee = async (employeeData) => {
  const response = await api.post('/employees', employeeData);
  return response.data;
};

// Update an employee
export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`/employees/${id}`, employeeData);
  return response.data;
};

// Delete an employee
export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};

export default api;
