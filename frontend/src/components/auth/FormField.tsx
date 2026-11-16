import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

const FormField = ({
  label,
  error,
  id,
  className = "",
  ...props
}: FormFieldProps) => {
  const hasError = Boolean(error);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-surface-elevated px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus-ring ${
          hasError
            ? "border-red-500/60 focus-visible:ring-red-500"
            : "border-white/10 hover:border-white/20 focus-visible:border-brand-500"
        } ${className}`}
        {...props}
      />
      {hasError && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
