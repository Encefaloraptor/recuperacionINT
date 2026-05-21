import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsuarios = async () => {
  return await axios.get(`${API_URL}/empleados`);
};

export const createUsuario = async (usuario) => {
  return await axios.post(`${API_URL}/empleados`, usuario);
};

export const updateUsuario = async (id, usuario) => {
  return await axios.put(`${API_URL}/empleados/${id}`, usuario);
};

export const deleteUsuario = async (id) => {
  return await axios.delete(`${API_URL}/empleados/${id}`);
};
