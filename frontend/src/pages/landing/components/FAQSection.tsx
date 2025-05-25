export const FAQSection = () => (
    <section className="py-20 mb-20 px-6 bg-[var(--background-secondary-color)] max-w-6xl mx-auto rounded-[var(--border-radius-medium)]">
        <h2 className="text-4xl font-semibold text-center mb-12">Preguntas Frecuentes</h2>
        <div className="space-y-8 text-[var(--text-secondary-color)] max-w-3xl mx-auto">
            <FAQItem
                question="¿Puedo crear eventos gratis?"
                answer="Sí, con el plan gratis puedes crear hasta 5 eventos al mes sin costo alguno."
            />
            <FAQItem
                question="¿Cómo funcionan las invitaciones?"
                answer="Puedes enviar enlaces o códigos únicos para que los participantes se unan fácilmente."
            />
            <FAQItem
                question="¿Puedo cambiar de plan en cualquier momento?"
                answer="Sí, puedes actualizar tu plan y disfrutar de más beneficios cuando quieras."
            />
        </div>
    </section>
);

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
