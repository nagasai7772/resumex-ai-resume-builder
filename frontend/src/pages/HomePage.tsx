import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TemplatesShowcase from "../components/TemplatesShowcase";
import CTASection from "../components/CTASection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TemplatesShowcase />
        <CTASection />
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="section-container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ResumeX. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="transition hover:text-slate-900 focus-ring rounded">
              Privacy
            </a>
            <a href="#" className="transition hover:text-slate-900 focus-ring rounded">
              Terms
            </a>
            <a href="#" className="transition hover:text-slate-900 focus-ring rounded">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
