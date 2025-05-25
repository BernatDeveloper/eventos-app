import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { PlansSection } from "./components/PlansSection";
import { TestimonialsSection } from "./components/TestimonialSection";
import { FAQSection } from "./components/FAQSection";

export const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--background-color)] text-[var(--text-primary-color)]">
            <HeroSection />
            <FeaturesSection />
            <PlansSection />
            <TestimonialsSection />
            <FAQSection />
        </div>
    );
};
