import { createContext, useState, ReactNode, useEffect } from "react";
import { login as loginService, register as registerService, logout as logoutService } from "../../services/authService";
import { getAuthUser } from "../../services/userService";
import { createToken, getToken, deleteToken } from "../../services/authService";
import { User } from "../../types/user";
import { AuthContextType } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { ROUTES } from "../../routes/routes";
import { resetEventsState } from "../../store/slices/eventSlice";
import { resetNotificationsState } from "../../store/slices/notificationSlice";
import { useAppDispatch } from "../../hooks/store";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = getToken();
        if (token) {
          const authUser = await getAuthUser();

          if (authUser) setUser(authUser);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginService(email, password);
    setUser({ id: data.user.id, name: data.user.name, email: data.user.email, profile_image: data.user.profile_image, user_type: data.user.user_type, role: data.user.role });
    createToken(data.token); // Guardamos el token en el localStorage
  };

  const register = async (userData: any) => {
    try {
      const data = await registerService(userData);
      const { id, name, email, profile_image, user_type, role } = data.user;
      setUser({ id, name, email, profile_image, user_type, role });
      createToken(data.token);
    } catch (error: any) {
      const message = error.message;
      throw new Error(message);
    }
  };


  const logout = async () => {
    await logoutService();
    setUser(null);
    dispatch(resetEventsState());
    dispatch(resetNotificationsState());
    deleteToken(); // Eliminamos el token del localStorage
    navigate(ROUTES.login)
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>

  );
};
