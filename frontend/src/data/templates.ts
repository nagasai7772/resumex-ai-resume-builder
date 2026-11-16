export interface ResumeTemplate {
  id: string;
  name: string;
  category: string;
  accent: string;
  headerBg: string;
  layout: "classic" | "modern" | "minimal";
  popular?: boolean;
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "executive",
    name: "Executive",
    category: "Professional",
    accent: "bg-slate-800",
    headerBg: "bg-slate-100",
    layout: "classic",
    popular: true,
  },
  {
    id: "modern-edge",
    name: "Modern Edge",
    category: "Creative",
    accent: "bg-brand-600",
    headerBg: "bg-brand-50",
    layout: "modern",
    popular: true,
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
    popular: true,
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
  {
    id: "corporate",
    name: "Corporate",
    category: "Business",
    accent: "bg-blue-800",
    headerBg: "bg-blue-50",
    layout: "classic",
  },
  {
    id: "startup",
    name: "Startup",
    category: "Tech",
    accent: "bg-violet-600",
    headerBg: "bg-violet-50",
    layout: "modern",
  },
  {
    id: "elegant",
    name: "Elegant",
    category: "Executive",
    accent: "bg-amber-700",
    headerBg: "bg-amber-50",
    layout: "classic",
  },
  {
    id: "compact",
    name: "Compact",
    category: "One Page",
    accent: "bg-teal-600",
    headerBg: "bg-teal-50",
    layout: "minimal",
  },
  {
    id: "bold",
    name: "Bold Statement",
    category: "Marketing",
    accent: "bg-orange-600",
    headerBg: "bg-orange-50",
    layout: "modern",
    popular: true,
  },
  {
    id: "classic-serif",
    name: "Classic Serif",
    category: "Traditional",
    accent: "bg-stone-700",
    headerBg: "bg-stone-100",
    layout: "classic",
  },
  {
    id: "developer",
    name: "Developer",
    category: "Software",
    accent: "bg-cyan-600",
    headerBg: "bg-cyan-50",
    layout: "modern",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    category: "Medical",
    accent: "bg-sky-700",
    headerBg: "bg-sky-50",
    layout: "minimal",
  },
  {
    id: "finance",
    name: "Finance Pro",
    category: "Finance",
    accent: "bg-green-800",
    headerBg: "bg-green-50",
    layout: "classic",
  },
];
