import { useState } from "react";
import type { ResumeTemplate } from "../../data/templates";
import TemplatePreview from "./TemplatePreview";
import { EyeIcon, ArrowRightIcon } from "../ui/Icons";

interface TemplateCardProps {
  template: ResumeTemplate;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative bg-slate-50 p-5 pb-0">
        <TemplatePreview template={template} />

        <div
          className={`absolute inset-0 flex items-center justify-center gap-3 bg-slate-900/60 backdrop-blur-[2px] transition-opacity duration-300 ${
            hovered ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!hovered}
        >
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:scale-105 focus-ring"
            aria-label={`Preview ${template.name} template`}
          >
            <EyeIcon className="h-4 w-4" />
            Preview
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus-ring"
            aria-label={`Use ${template.name} template`}
          >
            Use Template
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        {template.popular && (
          <span className="absolute left-4 top-4 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white shadow-md">
            Popular
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">{template.name}</h3>
            <p className="mt-0.5 text-sm text-slate-500">{template.category}</p>
          </div>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
            Free
          </span>
        </div>
      </div>
    </article>
  );
};

export default TemplateCard;
