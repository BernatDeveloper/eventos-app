import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

export const Landing = () => {
    return (
        <div className="w-full bg-gray-100">
            {/* Hero Section */}
            <section className="text-center py-12 bg-blue-600 text-white">
                <h1 className="text-4xl font-bold">Organiza Eventos con Facilidad</h1>
                <p className="mt-4 text-lg">Crea, gestiona y participa en eventos con amigos, familia o equipos.</p>

            </section>

            {/* Características Clave */}
            <section className="py-16 px-6 text-center">
                <NavLink to={ROUTES.dashboard} className="mt-6 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg">Dashboard</NavLink>
            </section>

            {/* Cómo Funciona */}
            <section className="py-16 bg-gray-200 px-6">
                <h2 className="text-3xl font-semibold text-center">¿Cómo Funciona?</h2>
                <ol className="mt-8 space-y-4 list-decimal list-inside max-w-2xl mx-auto">
                    <li>Regístrate y crea tu cuenta.</li>
                    <li>Crea un evento con todos los detalles necesarios.</li>
                    <li>Invita a participantes mediante enlaces únicos o códigos.</li>
                    <li>Gestiona el evento y consulta asistentes en tiempo real.</li>
                </ol>
            </section>

            {/* Planes y Beneficios */}
            <section className="py-16 px-6">
                <h2 className="text-3xl font-semibold text-center">Planes y Beneficios</h2>
                <div className="mt-8 flex flex-col md:flex-row justify-center gap-6">
                    <div className="p-6 text-center bg-white shadow-md">
                        <h3 className="text-2xl font-bold">Gratis</h3>
                        <p className="mt-4 text-gray-600">Organiza hasta 5 eventos al mes sin costo.</p>
                    </div>
                    <div className="p-6 text-center bg-blue-600 text-white shadow-md">
                        <h3 className="text-2xl font-bold">Premium</h3>
                        <p className="mt-4">Eventos ilimitados, personalización avanzada y más.</p>
                    </div>
                </div>
            </section>

            {/* Testimonios */}
            <section className="py-16 bg-gray-200 px-6 text-center">
                <h2 className="text-3xl font-semibold">Lo que dicen nuestros usuarios</h2>
                <div className="mt-8 flex flex-col md:flex-row justify-center gap-6">
                    <div className="p-6 bg-white shadow-md">
                        <p className="text-gray-600">"Increíble plataforma, organizar eventos nunca fue tan fácil."</p>
                        <span className="block mt-2 font-semibold">- Ana Rodríguez</span>
                    </div>
                    <div className="p-6 bg-white shadow-md">
                        <p className="text-gray-600">"El plan premium vale cada centavo, muy recomendado."</p>
                        <span className="block mt-2 font-semibold">- Carlos Pérez</span>
                    </div>
                </div>
            </section>

            {/* Llamado a la Acción Final */}
            <section className="py-16 text-center bg-blue-600 text-white">
                <h2 className="text-3xl font-semibold">Empieza a Organizar Eventos Hoy</h2>
                <button className="mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg">Regístrate Gratis</button>
            </section>
        </div>
    );
}
