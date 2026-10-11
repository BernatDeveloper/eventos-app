import axios from "axios";
import { getToken, createToken, deleteToken } from "./authService";
import i18next from "i18next";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fired when the token cannot be renewed; AuthProvider listens to it and
// clears the session (the interceptor cannot use React hooks).
export const SESSION_EXPIRED_EVENT = "auth:session-expired";

// A 401 on these endpoints is a real answer, never a reason to refresh the
// token (refreshing from /refresh would wait for itself forever).
const AUTH_ENDPOINTS = ["/login", "/register", "/refresh"];

const isAuthEndpoint = (url?: string) =>
  AUTH_ENDPOINTS.some((endpoint) => url?.endsWith(endpoint));

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!navigator.onLine) {
      return Promise.reject(
        i18next.t("error.no_connection") || "No internet connection.",
      );
    }

    if (error.response?.status === 401) {

      if (originalRequest._retry || isAuthEndpoint(originalRequest.url)) {
        return Promise.reject(error);
      }

      const currentToken = getToken();

      if (!currentToken) {
        return Promise.reject(error.response.data.message);
      }

      // The token was already renewed by another request while this one was
      // in flight: just retry with the new token instead of refreshing again
      // (the old token is blacklisted, so a second refresh would fail).
      const sentToken = String(originalRequest.headers?.Authorization ?? "").replace("Bearer ", "");
      if (sentToken && sentToken !== currentToken) {
        originalRequest._retry = true;
        originalRequest.headers.Authorization = `Bearer ${currentToken}`;
        return api(originalRequest);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest._retry = true;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Plain axios on purpose: this call must not go through the
        // interceptors above, otherwise a 401 here would wait for itself.
        const response = await axios.post(`${API_BASE_URL}/refresh`, {}, {
          timeout: 30000,
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        const newToken = response.data.token;

        createToken(newToken);

        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        processQueue(null, newToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // The session cannot be recovered: drop the token and let the
        // AuthProvider clear the user and go back to the login page.
        deleteToken();
        window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);



export default api;