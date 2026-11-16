import Button from "./ui/Button";
import { ArrowRightIcon, CheckIcon, StarIcon } from "./ui/Icons";

const benefits = [
  "No credit card required",
  "Free ATS score analysis",
  "Export unlimited PDFs",
];

const CTASection = () => {
  return (
    <section aria-labelledby="cta-heading" className="section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl bg-cta-gradient px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          {/* Decorative elements */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-10 top-10 hidden h-20 w-20 rounded-2xl border border-white/20 lg:block"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-10 left-1/3 hidden h-12 w-12 rounded-full border border-white/15 lg:block"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            {/* Social proof pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <div className="flex -space-x-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} className="h-4 w-4 text-amber-300" />
                ))}
              </div>
              Trusted by 50,000+ job seekers
            </div>

            <h2
              id="cta-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Ready to land your{" "}
              <span className="underline decoration-white/30 decoration-wavy underline-offset-4">
                dream job
              </span>
              ?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Join thousands of professionals who've transformed their careers
              with AI-powered resumes. Start building yours today — it's free.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="!bg-white !from-white !to-white !text-brand-700 shadow-xl hover:!bg-slate-50 hover:shadow-2xl"
              >
                Create My Resume
                <ArrowRightIcon />
              </Button>
            </div>

            {/* Benefits list */}
            <ul className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-white/90"
                >
                  <CheckIcon className="h-4 w-4 shrink-0 text-emerald-300" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
