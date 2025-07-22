import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { PlansSection } from "./components/PlansSection";
import { TestimonialsSection } from "./components/TestimonialSection";
import { FAQSection } from "./components/FAQSection";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Landing = () => {
    useEffect(() => {
        AOS.init({ 
            duration: 1000,
         });
    }, []);

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
