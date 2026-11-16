import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TemplateCard from "../components/templates/TemplateCard";
import SectionHeader from "../components/ui/SectionHeader";
import { resumeTemplates } from "../data/templates";

const categories = ["All", ...new Set(resumeTemplates.map((t) => t.category))];

const TemplatesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = useMemo(
    () =>
      activeCategory === "All"
        ? resumeTemplates
        : resumeTemplates.filter((t) => t.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="border-b border-slate-200 bg-white">
        <div className="section-container flex items-center justify-between py-4 sm:py-5">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-slate-900 focus-ring rounded-lg sm:text-2xl"
          >
            Resume<span className="text-brand-600">X</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-ring sm:inline-flex"
            >
              Log in
            </Link>
            <Link
              to="/sign-up"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-glow-sm transition-all hover:from-brand-500 hover:to-indigo-500 focus-ring"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="section-container">
          <SectionHeader
            badge="Templates"
            title="Choose your perfect"
            highlight="resume template"
            description="Browse 15 professionally designed, ATS-friendly templates. Pick one and customize it with AI in minutes."
            headingId="templates-page-heading"
          />

          {/* Category filter */}
          <div
            className="mt-10 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Filter templates by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-ring ${
                  activeCategory === category
                    ? "bg-brand-600 text-white shadow-glow-sm"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <p className="mt-12 text-center text-slate-500">
              No templates found in this category.
            </p>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="section-container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ResumeX. All rights reserved.
          </p>
          <Link
            to="/"
            className="text-sm text-slate-500 transition hover:text-slate-900 focus-ring rounded"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default TemplatesPage;
