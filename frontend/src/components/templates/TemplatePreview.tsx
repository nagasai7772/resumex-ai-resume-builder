import type { ResumeTemplate } from "../../data/templates";

interface TemplatePreviewProps {
  template: ResumeTemplate;
}

const TemplatePreview = ({ template }: TemplatePreviewProps) => (
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

export default TemplatePreview;
