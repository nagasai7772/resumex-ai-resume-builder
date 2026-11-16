import Button from "./ui/Button";
import { ArrowRightIcon, SparklesIcon } from "./ui/Icons";

const stats = [
  { value: "50K+", label: "Resumes created" },
  { value: "4.9", label: "User rating" },
  { value: "98%", label: "ATS pass rate" },
];

const HeroSection = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-surface-dark pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="section-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-300">
              <SparklesIcon className="h-4 w-4" />
              AI-Powered Resume Builder
            </div>

            <h1
              id="hero-heading"
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Build a resume that{" "}
              <span className="gradient-text">gets you hired</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
              Create ATS-optimized, professionally designed resumes in minutes.
              Let AI craft compelling bullet points tailored to your dream role.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg">
                Start Building Free
                <ArrowRightIcon />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual placeholder — AI resume builder mockup */}
          <div className="animate-slide-in-right animation-delay-200 relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="animate-float relative">
              {/* Glow behind card */}
              <div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-600/30 to-indigo-600/30 blur-2xl"
                aria-hidden="true"
              />

              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-card shadow-card-dark"
                role="img"
                aria-label="Preview of the ResumeX AI resume builder interface"
              >
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="flex-1 text-center text-xs text-slate-500">
                    ResumeX Editor
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-0">
                  {/* Sidebar */}
                  <div className="col-span-2 border-r border-white/5 bg-surface-elevated p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600/20">
                        <SparklesIcon className="h-4 w-4 text-brand-400" />
                      </div>
                      <span className="text-xs font-semibold text-white">
                        AI Assistant
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-lg bg-brand-500/10 p-2.5 ring-1 ring-brand-500/20">
                        <p className="text-[10px] leading-relaxed text-brand-200">
                          ✨ Improved your experience bullet — added metrics and
                          action verbs
                        </p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-2.5">
                        <p className="text-[10px] text-slate-400">
                          Suggest skills for Software Engineer role...
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resume preview */}
                  <div className="col-span-3 bg-white p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="h-3 w-24 rounded bg-slate-800" />
                        <div className="mt-1.5 h-2 w-32 rounded bg-slate-300" />
                      </div>
                      <div className="border-t border-slate-100 pt-2">
                        <div className="h-2 w-16 rounded bg-brand-600/60" />
                        <div className="mt-2 space-y-1.5">
                          <div className="h-1.5 w-full rounded bg-slate-200" />
                          <div className="h-1.5 w-5/6 rounded bg-slate-200" />
                          <div className="h-1.5 w-4/6 rounded bg-slate-200" />
                        </div>
                      </div>
                      <div className="border-t border-slate-100 pt-2">
                        <div className="h-2 w-20 rounded bg-brand-600/60" />
                        <div className="mt-2 space-y-1.5">
                          <div className="h-1.5 w-full rounded bg-slate-200" />
                          <div className="h-1.5 w-3/4 rounded bg-slate-200" />
                        </div>
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        {["React", "TypeScript", "Node.js"].map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-brand-50 px-2 py-0.5 text-[8px] font-medium text-brand-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-surface-card px-4 py-2.5 shadow-card-dark sm:-left-6">
                <p className="text-xs font-semibold text-white">ATS Score</p>
                <p className="text-lg font-bold text-emerald-400">96/100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
