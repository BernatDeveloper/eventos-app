import { MdEventNote, MdLink, MdShowChart } from "react-icons/md";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export const FeaturesSection = () => {
  const { t } = useTranslation("landing");

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-semibold text-center mb-12">{t('features.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-[var(--text-secondary-color)]">
        <FeatureCard icon={<MdEventNote />} title={t('features.card1.title')} description={t('features.card1.desc')} />
        <FeatureCard icon={<MdLink />} title={t('features.card2.title')} description={t('features.card2.desc')} />
        <FeatureCard icon={<MdShowChart />} title={t('features.card3.title')}description={t('features.card3.desc')} />
      </div>
    </section>
  )
};

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
