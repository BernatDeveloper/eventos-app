import { useTranslation } from "react-i18next";

export const TestimonialsSection = () => {
    const { t } = useTranslation("landing");

    return (
        <section className="py-20 px-6 max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-12">{t('testimonials.title')}</h2>
            <div className="flex flex-col md:flex-row justify-center gap-10">
                <Testimonial
                    text={t('testimonials.card1.text')}
                    author="Ana Rodríguez"
                />
                <Testimonial
                    text={t('testimonials.card2.text')}
                    author="Carlos Pérez"
                />
            </div>
        </section>
    )
};

export interface TestimonialCardProps {
    text: string;
    author: string;
}

const Testimonial = ({ text, author }: TestimonialCardProps) => (
    <blockquote className="flex-1 p-8 bg-[var(--background-secondary-color)] rounded-[var(--border-radius-medium)] shadow-[var(--box-shadow-light)] italic text-[var(--text-secondary-color)]">
        <p>"{text}"</p>
        <footer className="mt-4 font-semibold text-[var(--primary-color)]">— {author}</footer>
    </blockquote>
);
