import { useAuth } from '../../contexts/AuthContext/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Hook para navegar

  if (!user) {
    return <p>No has iniciado sesión.</p>;
  }

  const redirectToProfile = () => {
    // Redirige a la ruta de perfil con el id del usuario
    navigate(ROUTES.profile.replace(':id', user.id));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Bienvenido, {user.name}!</h2>
      <p className="text-lg">ID de usuario: {user.id}</p>

      <div className="mt-8">
        <button
          onClick={redirectToProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Ir al perfil
        </button>
      </div>
    </div>
  );
};
