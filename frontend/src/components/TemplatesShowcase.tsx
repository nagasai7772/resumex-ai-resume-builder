import { useState } from "react";
import SectionHeader from "./ui/SectionHeader";
import Button from "./ui/Button";
import { EyeIcon, ArrowRightIcon } from "./ui/Icons";
import { useNavigate } from "react-router-dom";

interface Template {
  id: string;
  name: string;
  category: string;
  accent: string;
  headerBg: string;
  layout: "classic" | "modern" | "minimal";
}

const templates: Template[] = [
  {
    id: "executive",
    name: "Executive",
    category: "Professional",
    accent: "bg-slate-800",
    headerBg: "bg-slate-100",
    layout: "classic",
  },
  {
    id: "modern-edge",
    name: "Modern Edge",
    category: "Creative",
    accent: "bg-brand-600",
    headerBg: "bg-brand-50",
    layout: "modern",
  },
  {
    id: "minimal",
    name: "Minimal",
    category: "Clean",
    accent: "bg-slate-400",
    headerBg: "bg-white",
    layout: "minimal",
  },
  {
    id: "tech-stack",
    name: "Tech Stack",
    category: "Engineering",
    accent: "bg-indigo-600",
    headerBg: "bg-indigo-50",
    layout: "modern",
  },
  {
    id: "creative",
    name: "Creative Pro",
    category: "Design",
    accent: "bg-rose-500",
    headerBg: "bg-rose-50",
    layout: "classic",
  },
  {
    id: "academic",
    name: "Academic",
    category: "Research",
    accent: "bg-emerald-600",
    headerBg: "bg-emerald-50",
    layout: "minimal",
  },
];

const TemplatePreview = ({ template }: { template: Template }) => (
  <div className="aspect-[8.5/11] w-full overflow-hidden rounded-lg bg-white p-3 shadow-inner">
    <div className={`mb-3 rounded ${template.headerBg} p-2`}>
      <div className={`h-2.5 w-16 rounded ${template.accent}`} />
      <div className="mt-1.5 h-1.5 w-24 rounded bg-slate-300" />
    </div>
    {template.layout === "modern" && (
      <div className={`mb-2 h-0.5 w-full rounded ${template.accent}`} />
    )}
    <div className="space-y-2">
      <div>
        <div className={`h-1 w-10 rounded ${template.accent} opacity-60`} />
        <div className="mt-1 space-y-0.5">
          <div className="h-1 w-full rounded bg-slate-200" />
          <div className="h-1 w-4/5 rounded bg-slate-200" />
        </div>
      </div>
      <div>
        <div className={`h-1 w-12 rounded ${template.accent} opacity-60`} />
        <div className="mt-1 space-y-0.5">
          <div className="h-1 w-full rounded bg-slate-200" />
          <div className="h-1 w-3/5 rounded bg-slate-200" />
        </div>
      </div>
      {template.layout !== "minimal" && (
        <div className="flex gap-1 pt-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-3 w-8 rounded-full ${template.headerBg} ring-1 ring-slate-200`}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);

const TemplatesShowcase = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate()

  return (
    <section
      id="templates"
      aria-labelledby="templates-heading"
      className="section-padding bg-surface-muted"
    >
      <div className="section-container">
        <SectionHeader
          badge="Templates"
          title="Professionally designed"
          highlight="templates"
          description="Start with a template that matches your industry. Every design is ATS-friendly and fully customizable."
          headingId="templates-heading"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(template.id)}
              onBlur={() => setHoveredId(null)}
            >
              {/* Preview area */}
              <div className="relative bg-slate-50 p-5 pb-0">
                <TemplatePreview template={template} />

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center gap-3 bg-slate-900/60 backdrop-blur-[2px] transition-opacity duration-300 ${
                    hoveredId === template.id
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                  aria-hidden={hoveredId !== template.id}
                >
                  <button
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:scale-105 focus-ring"
                    aria-label={`Preview ${template.name} template`}
                  >
                    <EyeIcon className="h-4 w-4" />
                    Preview
                  </button>
                  <button
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus-ring"
                    aria-label={`Use ${template.name} template`}
                  >
                    Use Template
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {template.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {template.category}
                    </p>
                  </div>
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                    Free
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="secondary" size="lg" onClick={()=>navigate('/design-template')}>
            Browse All Templates
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplatesShowcase;
