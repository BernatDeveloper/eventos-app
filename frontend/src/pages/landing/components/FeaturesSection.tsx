import { MdEventNote, MdLink, MdShowChart } from "react-icons/md";
import { ReactNode } from "react";

export const FeaturesSection = () => (
    <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-12">Características Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-[var(--text-secondary-color)]">
            <FeatureCard icon={<MdEventNote />} title="Gestión Fácil" description="Organiza eventos sin complicaciones con herramientas intuitivas." />
            <FeatureCard icon={<MdLink />} title="Invitaciones Únicas" description="Envía enlaces y códigos exclusivos para controlar quién asiste." />
            <FeatureCard icon={<MdShowChart />} title="Estadísticas en Tiempo Real" description="Consulta asistentes y gestión de eventos al instante." />
        </div>
    </section>
);

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="flex flex-col items-center space-y-4 p-6 border border-[var(--background-secondary-color)] rounded-[var(--border-radius-medium)] shadow-[var(--box-shadow-light)]">
    <div className="text-[var(--primary-color)] text-6xl">{icon}</div>
    <h3 className="text-2xl font-bold text-[var(--primary-color)]">{title}</h3>
    <p>{description}</p>
  </div>
);
