interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  headingId?: string;
}

const SectionHeader = ({
  badge,
  title,
  highlight,
  description,
  align = "center",
  dark = false,
  headingId,
}: SectionHeaderProps) => {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {badge && (
        <span
          className={`mb-4 inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider ${
            dark
              ? "bg-brand-500/15 text-brand-300 ring-1 ring-brand-500/25"
              : "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        id={headingId}
        className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="gradient-text">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
