import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { AppRouter } from "./routes/AppRouter";
import { Navbar } from "./shared/Navbar/Navbar";
import "./styles/index.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <AppRouter />
    </AuthProvider>
  )
};

export default App;
