import SectionHeader from "./ui/SectionHeader";
import {
  SparklesIcon,
  WandIcon,
  ChartIcon,
  ShieldIcon,
  BoltIcon,
  PaletteIcon,
} from "./ui/Icons";

const features = [
  {
    icon: SparklesIcon,
    title: "AI Content Generation",
    description:
      "Generate compelling bullet points, summaries, and skill suggestions tailored to your target role.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: WandIcon,
    title: "Smart Rewriting",
    description:
      "Transform weak phrases into impact-driven statements with one click. AI polishes your language instantly.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: ChartIcon,
    title: "ATS Optimization",
    description:
      "Real-time scoring ensures your resume passes applicant tracking systems used by top companies.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: ShieldIcon,
    title: "Privacy First",
    description:
      "Your data stays yours. Enterprise-grade encryption keeps your career information secure.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: BoltIcon,
    title: "Instant Export",
    description:
      "Download pixel-perfect PDFs or share a live link. Multiple formats, zero formatting headaches.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: PaletteIcon,
    title: "Premium Templates",
    description:
      "Choose from designer-crafted templates that balance aesthetics with recruiter-friendly layouts.",
    color: "from-cyan-500 to-sky-600",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="section-padding bg-surface-muted"
    >
      <div className="section-container">
        <SectionHeader
          badge="Features"
          title="Everything you need to"
          highlight="stand out"
          description="Powerful AI tools and professional design — combined in one seamless resume-building experience."
          headingId="features-heading"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="group card-interactive rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div
                className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3 text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                aria-hidden="true"
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
