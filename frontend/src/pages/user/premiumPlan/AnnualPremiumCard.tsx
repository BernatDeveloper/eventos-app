import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";

export const AnnualPremiumCard = () => {
  const { t } = useTranslation('premiumPlan')
  return (
    <section className="min-w-[260px] max-w-md flex-1 py-10 px-4 bg-[var(--background-secondary-color)] rounded-[var(--border-radius-large)] border border-dashed border-[var(--primary-color)] opacity-60 flex flex-col items-center justify-between text-center cursor-not-allowed">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 w-20 h-20 flex items-center justify-center rounded-full border-4 border-[var(--primary-color)]">
          <FaStar className="text-[var(--primary-color)] text-3xl" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-[var(--primary-color)]">
          {t('anual_card.title')}
        </h2>
      </div>
      <div>
        <p className="text-lg font-medium mb-1">{t('anual_card.price')}</p>
        <p className="italic text-sm">{t('anual_card.not_available')}</p>
      </div>
    </section>
  );
};
