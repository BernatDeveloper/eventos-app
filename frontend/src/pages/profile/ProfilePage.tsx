import { useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import { User } from "../../types/user";

export const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                console.log(userData)
                setUser(userData);
            } catch (err) {
                console.error("❌ Error al obtener el usuario:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            {user ? <p>Bienvenido, {user.name}</p> : <p>Cargando...</p>}
        </div>
    );
};
