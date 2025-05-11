import { ChangeEvent, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useUsers } from "../../../hooks/useUsers";
import BackToDashboard from "../../../shared/redirect/BackToDashboard";
import { Logout } from "../../../shared/logout/Logout";

export const Profile = () => {
  const { user } = useAuth();
  const { handleUpdateUsername, handleUpdateProfileImage } = useUsers();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSave = async () => {
    await handleUpdateUsername(name);
    setEditing(false);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const formData = new FormData();
      formData.append("profile_image", file);

      await handleUpdateProfileImage(formData);
    }
  };


  if (!user) {
    return <p className="text-center text-gray-500 mt-10">Cargando...</p>;
  }

  return (
    <>
      <BackToDashboard />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <h1 className="text-3xl underline font-semibold text-center text-gray-900 mb-6">
          Mi Perfil
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={
                user.profile_image
                  ? `${API_BASE_URL}storage/${user.profile_image}`
                  : "/default-avatar.avif"
              }
              alt="Avatar"
              className="w-62 h-62 rounded-full object-cover border border-gray-300"
            />
            {`${API_BASE_URL}storage/${user.profile_image}`}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-700"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-lg font-medium text-gray-800">{user.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-gray-600">{user.email}</p>
            </div>

            <div className="flex gap-4 mt-2">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setName(user.name);
                      setEditing(false);
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Editar nombre
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Logout />
        </div>
      </div>
    </>
  );
};
