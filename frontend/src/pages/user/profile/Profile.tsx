import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth'; // Asegúrate de que la ruta sea correcta
import { ROUTES } from '../../../routes/routes';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.home);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {user ? (
        <div>
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4">Perfil de {user.name}</h1>
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <p className="text-lg text-gray-700">ID de usuario: <span className="font-bold text-blue-600">{user.id}</span></p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLogout} // Llamamos a handleLogout para hacer logout y redirigir
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando...</p>
      )}
    </div>
  );
};
