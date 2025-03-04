import axios from "axios";
import { getToken, removeToken } from "./authService";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de solicitudes para agregar el token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Si la API responde con 401 (No autenticado)
      if (error.response.status === 401) {
        removeToken();
        window.location.href = "/login"; // <----------------- ROUTE
      }
    }
    return Promise.reject(error.response?.data || "Error en la solicitud");
  }
);

export default api;
