import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { AppRouter } from "./routes/AppRouter";
import "./styles/index.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 3000,
          success: { style: { background: "#f7fcf7" } },
          error: { style: { background: "#fcf7f7" } },
        }}
      />
    </AuthProvider>
  );
};

export default App;
