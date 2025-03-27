import { useEffect, useState } from "react";
import { getUser, updateUsername } from "../../services/userService";
import { User } from "../../types/user";
import { useParams } from "react-router-dom";

export const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!id) {
                    setMessage("❌ ID de usuario no válido.");
                    return;
                }

                const userData = await getUser(id);
                if (userData) {
                    setUser(userData);
                    setName(userData.name);
                }
            } catch (err) {
                console.error("❌ Error al obtener el usuario:", err);
                setMessage("❌ Error al obtener los datos del usuario.");
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (!id) {
            setMessage("❌ ID de usuario no válido.");
            return;
        }

        try {
            const updatedUser = await updateUsername(id, name);
            if (updatedUser) {
                setUser(updatedUser);
                setMessage("✅ Nombre actualizado correctamente.");
            } else {
                setMessage("⚠️ No se pudo actualizar el nombre.");
            }
        } catch (error) {
            setMessage("❌ Error al actualizar el nombre.");
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-4 text-center">Perfil de Usuario</h1>

            {user ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-lg font-medium text-gray-700">
                        Nombre:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Guardar cambios
                    </button>
                </form>
            ) : (
                <p className="text-center text-gray-500">Cargando...</p>
            )}

            {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        </div>
    );
};
