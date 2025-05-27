import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { ReactNode } from "react";

export interface PlanCardProps {
    title: string;
    description: string;
    features: string[];
    isSelected?: boolean;
}

export const PlansSection = () => (
    <section className="py-20 px-6 bg-[var(--background-secondary-color)]">
        <h2 className="text-4xl font-semibold text-center mb-12">Planes y Beneficios</h2>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center gap-12">
            <PlanCard
                title="Gratis"
                features={["Eventos básicos", "Invitaciones por enlace", "Gestión limitada"]}
                description="Organiza hasta 5 eventos al mes sin costo."
                isSelected
            />
            <PlanCard
                title="Premium"
                features={["Eventos ilimitados", "Personalización completa", "Soporte prioritario", "Estadísticas avanzadas"]}
                description="Eventos ilimitados, personalización avanzada y más."
            />
        </div>
    </section>
);

const PlanCard = ({ title, description, features, isSelected = false }: PlanCardProps) => (
    <div className={`flex-1 p-8 rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-${isSelected ? 'medium' : 'heavy'})] text-center ${isSelected ? 'bg-[var(--background-color)]' : 'bg-[var(--primary-color)] text-white hover:shadow-[var(--box-shadow-heavier)]'} transition cursor-${isSelected ? 'default' : 'pointer'}`}>
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-lg mb-6">{description}</p>
        <ul className={`text-left list-disc list-inside mb-6 space-y-2 ${isSelected ? 'text-[var(--text-secondary-color)]' : ''}`}>
            {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        {isSelected ? (
            <button disabled className="px-6 py-3 rounded-[var(--border-radius-medium)] bg-gray-300 text-gray-600 cursor-not-allowed">Seleccionado</button>
        ) : (
            <NavLink
                to={ROUTES.register}
                className="inline-block px-8 py-3 rounded-[var(--border-radius-medium)] bg-white text-[var(--primary-color)] font-semibold shadow-[var(--box-shadow-light)] hover:bg-[var(--background-secondary-color)] transition"
            >
                Empieza Ahora
            </NavLink>
        )}
    </div>
);
