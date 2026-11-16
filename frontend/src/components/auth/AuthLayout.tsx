import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SparklesIcon } from "../ui/Icons";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-surface-dark">
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="section-container relative flex min-h-screen flex-col items-center justify-center py-24 sm:py-28">
        <Link
          to="/"
          className="absolute left-4 top-6 text-xl font-bold tracking-tight text-white focus-ring rounded-lg sm:left-6 sm:top-8 sm:text-2xl"
        >
          Resume<span className="text-brand-400">X</span>
        </Link>

        <div className="w-full max-w-md animate-fade-in-up">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-300">
              <SparklesIcon className="h-4 w-4" />
              AI Resume Builder
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">{subtitle}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface-card/80 p-6 shadow-card-dark backdrop-blur-xl sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
