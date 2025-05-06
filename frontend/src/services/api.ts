import axios from "axios";
import { getToken } from "./authService";
import { useAuth } from "../hooks/useAuth";

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
    
    const lang = localStorage.getItem("lang") || "es";
    config.headers["Accept-Language"] = lang;

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuestas para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const { logout } = useAuth()
      logout()
    }
    return Promise.reject(error.response?.data || "Error en la solicitud");
  }
);

export default api;
