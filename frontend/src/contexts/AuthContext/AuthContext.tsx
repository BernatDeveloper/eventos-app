import { createContext, useState, ReactNode, useEffect } from "react";
import { login as loginService, register as registerService, logout as logoutService } from "../../services/authService";
import { getAuthUser } from "../../services/userService";
import { SESSION_EXPIRED_EVENT } from "../../services/api";
import { createToken, getToken, deleteToken } from "../../services/authService";
import { User } from "../../types/user";
import { AuthContextType } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { ROUTES } from "../../routes/routes";
import { resetEventsState } from "../../store/slices/eventSlice";
import { resetNotificationsState } from "../../store/slices/notificationSlice";
import { resetCategoriesState } from "../../store/slices/categorySlice";
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

  // The token could not be renewed (see services/api.ts): clear the session
  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null);
      dispatch(resetEventsState());
      dispatch(resetNotificationsState());
      dispatch(resetCategoriesState());
      setLoading(false);

      // Only leave the page if it needs a session (do not move people away
      // from the landing, login or register pages).
      const publicPaths = [ROUTES.home, ROUTES.login, ROUTES.register];
      if (!publicPaths.includes(window.location.pathname)) {
        navigate(ROUTES.login);
      }
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, []);

  const login = async (email: string, password: string) => {
    dispatch(resetEventsState());
    dispatch(resetNotificationsState());
    dispatch(resetCategoriesState());
    const data = await loginService(email, password);
    createToken(data.token); // Guardamos el token en el localStorage
    setUser({ id: data.user.id, name: data.user.name, email: data.user.email, profile_image: data.user.profile_image, user_type: data.user.user_type, role: data.user.role });
    // A previous session check may still be pending (e.g. stale token): the
    // user is authenticated now, so do not keep the app in the loading state.
    setLoading(false);
  };

  const register = async (userData: any) => {
    try {
      dispatch(resetEventsState());
      dispatch(resetNotificationsState());
      dispatch(resetCategoriesState());
      const data = await registerService(userData);
      const { id, name, email, profile_image, user_type, role } = data.user;
      createToken(data.token);
      setUser({ id, name, email, profile_image, user_type, role });
      setLoading(false);
    } catch (error: any) {
      const message = error.message;
      throw new Error(message);
    }
  };


  const logout = async () => {
    try {
      await logoutService();
    } catch {
      // Even if the server rejects the token (expired, invalid...) the local
      // session must be closed, otherwise the user could never log out.
    }
    setUser(null);
    dispatch(resetEventsState());
    dispatch(resetNotificationsState());
    dispatch(resetCategoriesState());
    deleteToken(); // Eliminamos el token del localStorage
    navigate(ROUTES.login)
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>

  );
};
