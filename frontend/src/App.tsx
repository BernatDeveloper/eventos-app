import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext/ThemeContext";
import { AppRouter } from "./routes/AppRouter";
import "./styles/index.css";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 3000,
            success: { className: '!text-[var(--text-primary-color)] !bg-[var(--background-secondary-color)] ' },
            error: { className: '!text-[var(--text-primary-color)] !bg-[var(--background-secondary-color)] ' },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
