import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown } from 'react-icons/fi';

export const FAQSection = () => {
    const { t } = useTranslation("landing");

    return (
        <section className="py-20 mb-20 px-6 bg-[var(--background-secondary-color)] max-w-6xl mx-auto rounded-[var(--border-radius-medium)]" data-aos="fade-up">
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

const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-[var(--background-color)] rounded-[var(--border-radius-medium)] shadow-[var(--box-shadow-light)] cursor-pointer overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full p-4 font-semibold text-lg select-none"
                aria-expanded={isOpen}
                aria-controls="faq-content"
            >
                {question}
                <FiChevronDown
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                    size={24}
                />
            </button>
            <div
                id="faq-content"
                className={`transition-all duration-300 px-4 pb-4 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
            >
                <p className="text-sm leading-relaxed break-words">{answer}</p>
            </div>
        </div>
    );
};

