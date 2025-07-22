import { useTranslation } from "react-i18next";
import { GoToPremiumPlan } from "../../../shared/redirect/GoToPremiumPlan";

export interface PlanCardProps {
    title: string;
    description: string;
    features: string[];
    isSelected?: boolean;
}

export const PlansSection = () => {
    const { t } = useTranslation("landing");

    return (
        <section className="py-20 px-6 bg-[var(--background-secondary-color)]">
            <h2 className="text-4xl font-semibold text-center mb-12" data-aos="fade-up">{t('plans.title')}</h2>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center gap-12">
                <PlanCard
                    title={t('plans.card1.title')}
                    features={[t('plans.card1.property1'), t('plans.card1.property2'), t('plans.card1.property3')]}
                    description={t('plans.card1.desc')}
                    isSelected
                />
                <PlanCard
                    title={t('plans.card2.title')}
                    features={[t('plans.card2.property1'), t('plans.card2.property2'), t('plans.card2.property3'), t('plans.card2.property4')]}
                    description={t('plans.card2.desc')}
                />
            </div>
        </section>
    )
};

const PlanCard = ({ title, description, features, isSelected = false }: PlanCardProps) => (
    <div className={`flex-1 p-8 rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-${isSelected ? 'medium' : 'heavy'})] text-center ${isSelected ? 'bg-[var(--primary-color)]' : 'bg-[var(--background-tertiary-color)]'} transition ${isSelected ? 'text-[var(--text-on-dark-primary)]' : 'text-[var(--text-primary-color)]'}`} data-aos="fade-up">
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-lg mb-6">{description}</p>
        <ul className={`text-left list-disc list-inside mb-6 space-y-2 ${isSelected ? 'text-[var(--text-on-dark-primary)]' : 'text-[var(--text-primary-color)]'}`}>
            {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        {isSelected ? (
            <button disabled className="px-6 py-3 rounded-[var(--border-radius-medium)] bg-gray-300 text-gray-600 cursor-not-allowed">Seleccionado</button>
        ) : (
            <GoToPremiumPlan />
        )}
    </div>
);
