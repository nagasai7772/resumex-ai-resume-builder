import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Download,
  Eye,
  FileText,
  Globe,
  Link,
  Mail,
  MapPin,
  Plus,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
  UserRound,
  X,
  Phone,
  CalendarDays,
} from "lucide-react";

type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
};

type Project = {
  id: string;
  name: string;
  type: string;
  role: string;
  link: string;
  description: string;
};

type HeaderInfo = {
  fullName: string;
  title: string;
  email: string;
  mobile: string;
  portfolio: string;
  linkedin: string;
  location: string;
};

type ResumeData = {
  header: HeaderInfo;
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: string[];
};

const STORAGE_KEY = "open-resume-builder-draft-v1";

const emptyResume: ResumeData = {
  header: {
    fullName: "",
    title: "",
    email: "",
    mobile: "",
    portfolio: "",
    linkedin: "",
    location: "",
  },
  summary: "",
  experience: [],
  projects: [],
  skills: [],
};

const steps = [
  { label: "Personal details", description: "Your contact information", icon: UserRound },
  { label: "Professional summary", description: "Your story in a few lines", icon: FileText },
  { label: "Work experience", description: "Where you've made an impact", icon: BriefcaseBusiness },
  { label: "Projects", description: "Work you're proud of", icon: Globe },
  { label: "Skills", description: "Your strongest capabilities", icon: Sparkles },
];

const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ElementType;
  hint?: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-[13px] font-semibold text-slate-700">{label}</span>
      <span className="relative block">
        {Icon && (
          <Icon
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 ${
            Icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </span>
      {hint && <span className="mt-1.5 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold text-slate-700">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
      />
      {hint && <span className="mt-1.5 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-[28px]">{title}</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function formatMonth(value: string) {
  if (!value) return "";
  const date = new Date(`${value}-01T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en", { month: "short", year: "numeric" });
}

function ResumePreview({ data }: { data: ResumeData }) {
  const { header } = data;
  const contactItems = [
    header.email,
    header.mobile,
    header.location,
    header.linkedin,
    header.portfolio,
  ].filter(Boolean);

  return (
    <article className="resume-paper mx-auto min-h-[900px] w-full max-w-[650px] bg-white px-8 py-9 text-[11px] leading-[1.55] text-slate-700 shadow-[0_18px_60px_rgba(15,23,42,0.12)] sm:px-11 sm:py-12">
      <header className="border-b-[2px] border-slate-900 pb-5 text-center">
        <h1 className="break-words text-[26px] font-extrabold uppercase leading-tight tracking-[0.045em] text-slate-950">
          {header.fullName || "YOUR NAME"}
        </h1>
        <p className="mt-2 text-[13px] font-semibold tracking-wide text-teal-800">
          {header.title || "Professional title"}
        </p>
        {contactItems.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-1 text-[9px] text-slate-500">
            {contactItems.map((item, index) => (
              <React.Fragment key={`${item}-${index}`}>
                {index > 0 && <span className="text-slate-300">•</span>}
                <span className="break-all">{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {data.summary.trim() && (
        <section className="mt-5">
          <h3 className="mb-2 border-b border-slate-200 pb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-900">
            Professional summary
          </h3>
          <p className="whitespace-pre-line">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mt-5">
          <h3 className="mb-3 border-b border-slate-200 pb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-900">
            Experience
          </h3>
          <div className="space-y-4">
            {data.experience.map((item) => (
              <div key={item.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h4 className="font-bold text-slate-900">{item.title || "Position"}</h4>
                  <span className="text-[9px] italic text-slate-500">
                    {formatMonth(item.startDate)}
                    {item.startDate ? " – " : ""}
                    {item.isCurrent ? "Present" : formatMonth(item.endDate)}
                  </span>
                </div>
                <p className="font-semibold text-slate-700">
                  {item.company}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
                {item.description && (
                  <p className="mt-1 whitespace-pre-line">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mt-5">
          <h3 className="mb-3 border-b border-slate-200 pb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-900">
            Projects
          </h3>
          <div className="space-y-4">
            {data.projects.map((item) => (
              <div key={item.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h4 className="font-bold text-slate-900">{item.name || "Project name"}</h4>
                  {item.type && <span className="text-[9px] italic text-slate-500">{item.type}</span>}
                </div>
                {item.role && <p className="font-semibold text-slate-700">{item.role}</p>}
                {item.description && <p className="mt-1 whitespace-pre-line">{item.description}</p>}
                {item.link && <p className="mt-1 break-all text-teal-800">{item.link}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mt-5">
          <h3 className="mb-2 border-b border-slate-200 pb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-900">
            Skills
          </h3>
          <p>{data.skills.join("  ·  ")}</p>
        </section>
      )}

      {!data.summary && !data.experience.length && !data.projects.length && !data.skills.length && (
        <div className="mt-20 text-center text-slate-300">
          <FileText className="mx-auto mb-3" size={28} strokeWidth={1.4} />
          <p className="text-[10px] uppercase tracking-[0.18em]">Your resume preview appears here</p>
        </div>
      )}
    </article>
  );
}

export default function CreateTemplate() {
  const [data, setData] = useState<ResumeData>(() => {
    if (typeof window === "undefined") return emptyResume;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? { ...emptyResume, ...JSON.parse(saved) } : emptyResume;
    } catch {
      return emptyResume;
    }
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showExpForm, setShowExpForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newExp, setNewExp] = useState<Experience>({
    id: "",
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });
  const [newProject, setNewProject] = useState<Project>({
    id: "",
    name: "",
    type: "",
    role: "",
    link: "",
    description: "",
  });

  const completion = useMemo(() => {
    const checks = [
      Boolean(data.header.fullName.trim()),
      Boolean(data.header.title.trim()),
      Boolean(data.header.email.trim()),
      Boolean(data.summary.trim()),
      data.experience.length > 0,
      data.projects.length > 0,
      data.skills.length > 0,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [data]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSavedAt(new Date());
      } catch (error) {
        console.error("Unable to save resume draft locally:", error);
      }
    }, 500);
    return () => window.clearTimeout(timer);
  }, [data]);

  const updateHeader = (field: keyof HeaderInfo, value: string) => {
    setData((previous) => ({
      ...previous,
      header: { ...previous.header, [field]: value },
    }));
  };

  const resetCurrentStep = () => {
    const confirmed = window.confirm("Reset the information in this section?");
    if (!confirmed) return;
    if (currentStep === 0) setData((previous) => ({ ...previous, header: emptyResume.header }));
    if (currentStep === 1) setData((previous) => ({ ...previous, summary: "" }));
    if (currentStep === 2) setData((previous) => ({ ...previous, experience: [] }));
    if (currentStep === 3) setData((previous) => ({ ...previous, projects: [] }));
    if (currentStep === 4) setData((previous) => ({ ...previous, skills: [] }));
  };

  const addExperience = () => {
    if (!newExp.title.trim() || !newExp.company.trim()) return;
    setData((previous) => ({
      ...previous,
      experience: [...previous.experience, { ...newExp, id: makeId() }],
    }));
    setNewExp({
      id: "",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
    setShowExpForm(false);
  };

  const addProject = () => {
    if (!newProject.name.trim()) return;
    setData((previous) => ({
      ...previous,
      projects: [...previous.projects, { ...newProject, id: makeId() }],
    }));
    setNewProject({ id: "", name: "", type: "", role: "", link: "", description: "" });
    setShowProjectForm(false);
  };

  const addSkill = () => {
    const skill = newSkill.trim();
    if (!skill || data.skills.some((item) => item.toLowerCase() === skill.toLowerCase())) return;
    setData((previous) => ({ ...previous, skills: [...previous.skills, skill] }));
    setNewSkill("");
  };

  const removeExperience = (id: string) =>
    setData((previous) => ({
      ...previous,
      experience: previous.experience.filter((item) => item.id !== id),
    }));

  const removeProject = (id: string) =>
    setData((previous) => ({
      ...previous,
      projects: previous.projects.filter((item) => item.id !== id),
    }));

  const saveDraft = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedAt(new Date());
    } catch (error) {
      console.error("Unable to save resume draft locally:", error);
      window.alert("Your browser could not save this draft. Check available storage.");
    }
  };

  const goNext = () => setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  const goPrevious = () => setCurrentStep((step) => Math.max(step - 1, 0));

  return (
    <div className="min-h-screen bg-[#f4f7f8] text-slate-900">
      <style>{`
        @media print {
          body { background: white !important; }
          body * { visibility: hidden !important; }
          .resume-paper, .resume-paper * { visibility: visible !important; }
          .resume-paper {
            position: absolute !important; left: 0 !important; top: 0 !important;
            width: 210mm !important; max-width: none !important; min-height: 297mm !important;
            margin: 0 !important; padding: 16mm 17mm !important; box-shadow: none !important;
          }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1220] text-white shadow-sm">
              <FileText size={19} />
            </div>
            <div>
              <p className="text-[15px] font-bold tracking-tight text-slate-950">OpenResume</p>
              <p className="text-[11px] font-medium text-slate-400">RESUME WORKSPACE</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-slate-500 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {savedAt ? `Saved locally at ${savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Saving your draft"}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview((value) => !value)}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
            >
              <Eye size={16} /> Preview
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#0b1220] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Save size={16} /> <span className="hidden sm:inline">Save draft</span><span className="sm:hidden">Save</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-teal-700">
              <span className="rounded-full bg-teal-50 px-2.5 py-1">RESUME BUILDER</span>
              <ChevronRight size={13} className="text-slate-300" />
              <span className="text-slate-400">Untitled resume</span>
            </div>
            <h1 className="text-[26px] font-bold tracking-tight text-slate-950 sm:text-3xl">
              Build a resume that gets noticed.
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Add your details, refine each section and watch your resume take shape.
            </p>
          </div>
          <div className="w-full max-w-[260px]">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Resume completeness</span>
              <span className="font-bold tabular-nums text-teal-700">{completion}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-teal-600 transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid items-start gap-5 xl:grid-cols-[245px_minmax(390px,1fr)_minmax(420px,0.95fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_4px_18px_rgba(15,23,42,0.035)]">
            <div className="px-3 pb-3 pt-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Your resume</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">Content sections</p>
            </div>
            <nav className="space-y-1" aria-label="Resume sections">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const active = currentStep === index;
                const complete =
                  (index === 0 &&
                    Boolean(data.header.fullName && data.header.title && data.header.email)) ||
                  (index === 1 && Boolean(data.summary.trim())) ||
                  (index === 2 && data.experience.length > 0) ||
                  (index === 3 && data.projects.length > 0) ||
                  (index === 4 && data.skills.length > 0);
                return (
                  <button
                    type="button"
                    key={step.label}
                    onClick={() => setCurrentStep(index)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      active
                        ? "bg-[#0b1220] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        active ? "bg-white/10 text-teal-300" : "bg-slate-100 text-slate-500 group-hover:bg-white"
                      }`}
                    >
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[13px] font-semibold ${active ? "text-white" : "text-slate-700"}`}>
                        {step.label}
                      </span>
                      <span className={`mt-0.5 block text-[10px] ${active ? "text-slate-400" : "text-slate-400"}`}>
                        {step.description}
                      </span>
                    </span>
                    {complete ? (
                      <CheckCircle2 size={16} className={active ? "text-teal-300" : "text-emerald-500"} />
                    ) : (
                      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-teal-300" : "bg-slate-200"}`} />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 rounded-xl bg-[#f2f7f6] p-3.5">
              <div className="mb-2 flex items-center gap-2 text-teal-800">
                <Sparkles size={15} />
                <span className="text-xs font-bold">A quick tip</span>
              </div>
              <p className="text-[11px] leading-5 text-slate-600">
                Use clear action verbs and measurable results to make your experience stand out.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 px-2 text-[10px] text-slate-400">
              <CircleHelp size={13} />
              Your draft stays in this browser.
            </div>
          </aside>

          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.035)]">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  STEP {currentStep + 1} <span className="px-1 text-slate-300">/</span> {steps.length}
                </span>
                <button
                  type="button"
                  onClick={resetCurrentStep}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <RotateCcw size={13} /> Reset section
                </button>
              </div>
              <div className="flex gap-1.5">
                {steps.map((step, index) => (
                  <span
                    key={step.label}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      index <= currentStep ? "bg-teal-600" : "bg-slate-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="min-h-[570px] px-5 py-7 sm:px-7 sm:py-8">
              {currentStep === 0 && (
                <>
                  <SectionHeading
                    eyebrow="The basics"
                    title="Let's start with you."
                    description="Add the details employers need to identify and contact you. Keep your information accurate and up to date."
                  />
                  <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field label="Full name" value={data.header.fullName} onChange={(value) => updateHeader("fullName", value)} placeholder="e.g. Alex Morgan" icon={UserRound} />
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Professional title" value={data.header.title} onChange={(value) => updateHeader("title", value)} placeholder="e.g. Full Stack Developer" icon={BriefcaseBusiness} hint="Use the role you are targeting." />
                    </div>
                    <Field label="Email address" value={data.header.email} onChange={(value) => updateHeader("email", value)} placeholder="alex@example.com" type="email" icon={Mail} />
                    <Field label="Phone number" value={data.header.mobile} onChange={(value) => updateHeader("mobile", value)} placeholder="+91 98765 43210" icon={Phone} />
                    <Field label="Location" value={data.header.location} onChange={(value) => updateHeader("location", value)} placeholder="City, Country" icon={MapPin} />
                    <Field label="Portfolio website" value={data.header.portfolio} onChange={(value) => updateHeader("portfolio", value)} placeholder="https://yourportfolio.com" icon={Globe} />
                    <div className="sm:col-span-2">
                      <Field label="LinkedIn profile" value={data.header.linkedin} onChange={(value) => updateHeader("linkedin", value)} placeholder="linkedin.com/in/yourprofile" icon={Link} />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <SectionHeading
                    eyebrow="Your introduction"
                    title="Make your first impression count."
                    description="Write a focused summary that connects your experience, strengths and the value you bring to the role."
                  />
                  <TextArea
                    label="Professional summary"
                    value={data.summary}
                    onChange={(value) => setData((previous) => ({ ...previous, summary: value }))}
                    placeholder="Example: Full Stack Developer experienced in building responsive web applications and REST APIs. Skilled in React, Node.js and PostgreSQL, with a focus on performance, maintainability and user experience."
                    rows={9}
                    hint={`${data.summary.length} characters · Aim for 2–4 concise sentences.`}
                  />
                  <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50/60 p-4">
                    <p className="text-xs font-bold text-teal-900">Writing guidance</p>
                    <ul className="mt-2 space-y-1.5 text-xs leading-5 text-teal-900/75">
                      <li>• Mention your role, relevant experience and strongest skills.</li>
                      <li>• Include the type of problems or products you have worked on.</li>
                      <li>• Avoid generic phrases that do not show evidence of your work.</li>
                    </ul>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <SectionHeading
                    eyebrow="Your career"
                    title="Show the impact of your work."
                    description="Add your most relevant roles first. Focus on responsibilities, technologies and measurable outcomes."
                  />
                  <div className="space-y-3">
                    {data.experience.map((item) => (
                      <div key={item.id} className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="break-words text-sm font-bold text-slate-900">{item.title}</h3>
                            <p className="mt-1 text-xs text-slate-500">
                              {item.company}{item.location ? ` · ${item.location}` : ""}
                            </p>
                            <p className="mt-2 text-[11px] text-slate-400">
                              {formatMonth(item.startDate)} – {item.isCurrent ? "Present" : formatMonth(item.endDate)}
                            </p>
                          </div>
                          <button type="button" onClick={() => removeExperience(item.id)} aria-label={`Remove ${item.title}`} className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {item.description && <p className="mt-3 line-clamp-3 whitespace-pre-line text-xs leading-5 text-slate-500">{item.description}</p>}
                      </div>
                    ))}
                    {!showExpForm ? (
                      <button type="button" onClick={() => setShowExpForm(true)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 py-4 text-sm font-semibold text-slate-600 transition hover:border-teal-500 hover:bg-teal-50/40 hover:text-teal-800">
                        <Plus size={17} /> Add work experience
                      </button>
                    ) : (
                      <div className="space-y-4 rounded-xl border border-teal-100 bg-[#fbfefd] p-4 sm:p-5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-900">New experience</h3>
                          <button type="button" onClick={() => setShowExpForm(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><X size={16} /></button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Job title *" value={newExp.title} onChange={(value) => setNewExp({ ...newExp, title: value })} placeholder="Software Engineer" />
                          <Field label="Company *" value={newExp.company} onChange={(value) => setNewExp({ ...newExp, company: value })} placeholder="Company name" />
                          <Field label="Location" value={newExp.location} onChange={(value) => setNewExp({ ...newExp, location: value })} placeholder="City or Remote" />
                          <Field label="Start date" value={newExp.startDate} onChange={(value) => setNewExp({ ...newExp, startDate: value })} type="month" icon={CalendarDays} />
                          <Field label="End date" value={newExp.endDate} onChange={(value) => setNewExp({ ...newExp, endDate: value })} type="month" icon={CalendarDays} />
                          <label className="flex items-center gap-2 self-end pb-3 text-xs font-medium text-slate-600">
                            <input type="checkbox" checked={newExp.isCurrent} onChange={(event) => setNewExp({ ...newExp, isCurrent: event.target.checked, endDate: "" })} className="h-4 w-4 rounded border-slate-300 accent-teal-700" />
                            I currently work here
                          </label>
                        </div>
                        <TextArea label="What did you do? Include achievements and results." value={newExp.description} onChange={(value) => setNewExp({ ...newExp, description: value })} placeholder="• Built and maintained...\n• Improved performance by..." rows={4} />
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => setShowExpForm(false)} className="rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-100">Cancel</button>
                          <button type="button" onClick={addExperience} disabled={!newExp.title.trim() || !newExp.company.trim()} className="rounded-lg bg-teal-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40">Add experience</button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <SectionHeading
                    eyebrow="Selected work"
                    title="Bring your projects to life."
                    description="Highlight projects that demonstrate your technical ability, problem-solving and ownership."
                  />
                  <div className="space-y-3">
                    {data.projects.map((item) => (
                      <div key={item.id} className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="break-words text-sm font-bold text-slate-900">{item.name}</h3>
                            <p className="mt-1 text-xs text-slate-500">{[item.role, item.type].filter(Boolean).join(" · ")}</p>
                          </div>
                          <button type="button" onClick={() => removeProject(item.id)} aria-label={`Remove ${item.name}`} className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {item.description && <p className="mt-3 line-clamp-3 whitespace-pre-line text-xs leading-5 text-slate-500">{item.description}</p>}
                      </div>
                    ))}
                    {!showProjectForm ? (
                      <button type="button" onClick={() => setShowProjectForm(true)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 py-4 text-sm font-semibold text-slate-600 transition hover:border-teal-500 hover:bg-teal-50/40 hover:text-teal-800">
                        <Plus size={17} /> Add a project
                      </button>
                    ) : (
                      <div className="space-y-4 rounded-xl border border-teal-100 bg-[#fbfefd] p-4 sm:p-5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-900">New project</h3>
                          <button type="button" onClick={() => setShowProjectForm(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><X size={16} /></button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Project name *" value={newProject.name} onChange={(value) => setNewProject({ ...newProject, name: value })} placeholder="Project name" />
                          <Field label="Project type" value={newProject.type} onChange={(value) => setNewProject({ ...newProject, type: value })} placeholder="Personal / Freelance" />
                          <Field label="Your role" value={newProject.role} onChange={(value) => setNewProject({ ...newProject, role: value })} placeholder="Full Stack Developer" />
                          <Field label="Project link" value={newProject.link} onChange={(value) => setNewProject({ ...newProject, link: value })} placeholder="https://..." />
                        </div>
                        <TextArea label="Project description" value={newProject.description} onChange={(value) => setNewProject({ ...newProject, description: value })} placeholder="What problem does it solve? What did you build? Which technologies did you use?" rows={4} />
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => setShowProjectForm(false)} className="rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-100">Cancel</button>
                          <button type="button" onClick={addProject} disabled={!newProject.name.trim()} className="rounded-lg bg-teal-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40">Add project</button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <SectionHeading
                    eyebrow="Your toolkit"
                    title="Add the skills you want to be known for."
                    description="Include relevant technical and professional skills. Keep the list focused on the role you're applying for."
                  />
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      value={newSkill}
                      onChange={(event) => setNewSkill(event.target.value)}
                      onKeyDown={(event) => event.key === "Enter" && addSkill()}
                      placeholder="e.g. React, Node.js, PostgreSQL"
                      className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                    />
                    <button type="button" onClick={addSkill} disabled={!newSkill.trim()} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40">
                      <Plus size={16} /> Add skill
                    </button>
                  </div>
                  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-700">Your skills</p>
                      <span className="text-[11px] text-slate-400">{data.skills.length} added</span>
                    </div>
                    {data.skills.length ? (
                      <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill) => (
                          <span key={skill} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                            {skill}
                            <button type="button" onClick={() => setData((previous) => ({ ...previous, skills: previous.skills.filter((item) => item !== skill) }))} aria-label={`Remove ${skill}`} className="text-slate-400 transition hover:text-rose-600">
                              <X size={13} />
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="py-5 text-center text-xs text-slate-400">Your added skills will appear here.</p>
                    )}
                  </div>
                  <div className="mt-5 rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-violet-50 p-2 text-violet-600"><Sparkles size={17} /></div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">One last review</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">Check your details and preview the complete resume before printing or exporting it as a PDF.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <button
                type="button"
                onClick={goPrevious}
                disabled={currentStep === 0}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                {currentStep === steps.length - 1 ? (
                  <>
                    <button type="button" onClick={() => setShowPreview(true)} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      <Eye size={16} /> Preview resume
                    </button>
                    <button type="button" onClick={() => { saveDraft(); window.print(); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800">
                      <Download size={16} /> Finish & export PDF
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={goNext} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0b1220] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800">
                    Continue <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className={`${showPreview ? "block" : "hidden"} min-w-0 xl:sticky xl:top-[92px] xl:block`}>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Live preview</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">Your resume · A4</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> LIVE
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#e9eef0] p-3 sm:p-5">
              <ResumePreview data={data} />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Changes update automatically</span>
              <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-800">
                <Download size={13} /> Print / Save PDF
              </button>
            </div>
          </section>
        </div>

        <footer className="mt-6 flex flex-col items-center justify-between gap-2 pb-4 text-[11px] text-slate-400 sm:flex-row">
          <span>OpenResume · Build a clear, confident professional story.</span>
          <span className="inline-flex items-center gap-1.5"><Check size={12} /> Your work is saved in this browser</span>
        </footer>
      </main>

      {showPreview && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm xl:hidden">
          <div className="mx-auto my-4 max-w-[760px] rounded-2xl bg-[#e9eef0] p-3 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">Resume preview</p>
                <p className="text-xs text-slate-500">A4 document</p>
              </div>
              <button type="button" onClick={() => setShowPreview(false)} aria-label="Close preview" className="rounded-lg bg-white p-2 text-slate-600 shadow-sm hover:bg-slate-50">
                <X size={18} />
              </button>
            </div>
            <ResumePreview data={data} />
            <div className="mt-3 flex justify-end">
              <button type="button" onClick={() => window.print()} className="inline-flex h-10 items-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-bold text-white hover:bg-teal-800">
                <Download size={15} /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
