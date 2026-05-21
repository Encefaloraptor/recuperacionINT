import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTareas = async () => {
  return await axios.get(`${API_URL}/tareas`);
};

export const createTarea = async (tarea) => {
  return await axios.post(`${API_URL}/tareas`, tarea);
};

export const updateTarea = async (id, tarea) => {
  return await axios.put(`${API_URL}/tareas/${id}`, tarea);
};

export const deleteTarea = async (id) => {
  return await axios.delete(`${API_URL}/tareas/${id}`);
};
