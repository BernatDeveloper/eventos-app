import { useTranslation } from "react-i18next";

export const FAQSection = () => {
    const { t } = useTranslation("landing");

    return (
        <section className="py-20 mb-20 px-6 bg-[var(--background-secondary-color)] max-w-6xl mx-auto rounded-[var(--border-radius-medium)]">
            <h2 className="text-4xl font-semibold text-center mb-12">{t('FAQs.title')}</h2>
            <div className="space-y-8 text-[var(--text-secondary-color)] max-w-3xl mx-auto">
                <FAQItem
                    question={t('FAQs.FAQ1.question')}
                    answer={t('FAQs.FAQ1.answer')}
                />
                <FAQItem
                    question={t('FAQs.FAQ2.question')}
                    answer={t('FAQs.FAQ2.answer')}
                />
                <FAQItem
                    question={t('FAQs.FAQ3.question')}
                    answer={t('FAQs.FAQ3.answer')}
                />
            </div>
        </section>
    )
};

export interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => (
    <details className="border border-[var(--background-color)] rounded-[var(--border-radius-medium)] p-4 shadow-[var(--box-shadow-light)] cursor-pointer">
        <summary className="font-semibold text-lg">{question}</summary>
        <p className="mt-2">{answer}</p>
    </details>
);
