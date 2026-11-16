import SectionHeader from "./ui/SectionHeader";
import {
  UploadIcon,
  SparklesIcon,
  PencilIcon,
  DownloadIcon,
} from "./ui/Icons";

const steps = [
  {
    step: 1,
    icon: UploadIcon,
    title: "Upload or Start Fresh",
    description:
      "Import your existing resume or begin with a blank canvas. Our AI parses your content instantly.",
  },
  {
    step: 2,
    icon: SparklesIcon,
    title: "AI Enhances Content",
    description:
      "Get smart suggestions for bullet points, skills, and summaries optimized for your target role.",
  },
  {
    step: 3,
    icon: PencilIcon,
    title: "Customize & Refine",
    description:
      "Pick a template, adjust sections, and fine-tune every detail with our intuitive editor.",
  },
  {
    step: 4,
    icon: DownloadIcon,
    title: "Download & Apply",
    description:
      "Export a polished, ATS-friendly PDF and start applying to your dream jobs with confidence.",
  },
];

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="section-padding bg-white"
    >
      <div className="section-container">
        <SectionHeader
          badge="How It Works"
          title="Four steps to your"
          highlight="perfect resume"
          description="From blank page to job-ready resume in under 10 minutes. No design skills required."
          headingId="how-it-works-heading"
        />

        <div className="relative mt-16">
          {/* Connecting line — desktop only */}
          <div
            className="absolute left-0 right-0 top-[3.25rem] hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 lg:block"
            aria-hidden="true"
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((item, index) => (
              <li
                key={item.step}
                className="group relative animate-fade-in-up opacity-0"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="relative z-10 mb-6">
                    <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border-2 border-brand-200 bg-white shadow-card transition-all duration-300 group-hover:border-brand-400 group-hover:shadow-glow-sm">
                      <item.icon className="h-7 w-7 text-brand-600 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white shadow-md">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
