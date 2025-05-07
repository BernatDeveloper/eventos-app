import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { AppRouter } from "./routes/AppRouter";
import { Navbar } from "./shared/Navbar/Navbar";
import { Footer } from "./shared/Footer/Footer";
import "./styles/index.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AppRouter />
        </main>
        <Footer />
      </div>
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 3000,
          success: {
            style: { background: "#f7fcf7" },
          },
          error: {
            style: { background: "#fcf7f7" },
          },
        }}
      />
    </AuthProvider>
  )
};

export default App;
