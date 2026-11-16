import { useState } from "react";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Templates", href: "#templates" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate=useNavigate()

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main navigation"
        className="section-container mt-4 sm:mt-5"
      >
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface-dark/80 px-4 py-3 shadow-lg backdrop-blur-xl sm:rounded-full sm:px-6 sm:py-3.5 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-white focus-ring rounded-lg sm:text-2xl"
          >
            Resume<span className="text-brand-400">X</span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white focus-ring rounded"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" className="!text-slate-300 hover:!text-white hover:!bg-white/10" onClick={()=>navigate('/login')}>
              Log in
            </Button>
            <Button size="sm">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white focus-ring md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`mt-2 overflow-hidden rounded-2xl border border-white/10 bg-surface-dark/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-transparent"
          }`}
        >
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white focus-ring"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-4">
              <Button variant="ghost" size="sm" className="w-full !text-slate-300 hover:!text-white hover:!bg-white/10">
                Log in
              </Button>
              <Button size="sm" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
