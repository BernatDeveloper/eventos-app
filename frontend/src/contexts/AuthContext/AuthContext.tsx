// src/contexts/AuthContext/AuthContext.tsx
import { createContext, useState, ReactNode, useEffect } from "react";
import { login as loginService, register as registerService, logout as logoutService } from "../../services/authService";
import { getAuthUser } from "../../services/userService";
import { createToken, getToken, deleteToken } from "../../services/authService";

interface AuthContextType {
  user: { id: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = getToken();
        if (token) {
          const user = await getAuthUser(token); // Pasa el token como argumento
          if (user) setUser(user);
        }
      } catch (error) {
        console.error("No hay sesión activa");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []); // Solo se ejecuta una vez al cargar la aplicación

  const login = async (email: string, password: string) => {
    const data = await loginService(email, password);
    setUser({ id: data.user.id, name: data.user.name });
    createToken(data.token); // Guardamos el token en el localStorage
  };

  const register = async (userData: any) => {
    const data = await registerService(userData);
    setUser({ id: data.user.id, name: data.user.name });
    createToken(data.token); // Guardamos el token en el localStorage
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    deleteToken(); // Eliminamos el token del localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {loading ? <div>Cargando...</div> : children} {/* Se muestra un mensaje de carga mientras se verifica el usuario */}
    </AuthContext.Provider>
  );
};
