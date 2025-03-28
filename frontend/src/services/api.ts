import axios from "axios";
import { getToken } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de solicitudes para agregar el token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuestas para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Aquí puedes manejar el logout si el token ya no es válido
      console.log("Token expirado, realiza el logout");
    }
    return Promise.reject(error.response?.data || "Error en la solicitud");
  }
);

export default api;
