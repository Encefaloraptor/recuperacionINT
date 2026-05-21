import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getEmpleados = async () => {
  return await axios.get(`${API_URL}/empleados`);
};

export const createEmpleado = async (empleado) => {
  return await axios.post(`${API_URL}/empleados`, empleado);
};

export const updateEmpleado = async (id, empleado) => {
  return await axios.put(`${API_URL}/empleados/${id}`, empleado);
};

export const deleteEmpleado = async (id) => {
  return await axios.delete(`${API_URL}/empleados/${id}`);
};
