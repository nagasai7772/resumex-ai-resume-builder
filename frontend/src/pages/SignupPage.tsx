import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";
import PasswordInput from "../components/auth/PasswordInput";
import Button from "../components/ui/Button";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../utils/validation";

interface SignupForm {
  fullName: string;
  email: string;
  password: string;
}

interface SignupErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

const SignupPage = () => {
  const [form, setForm] = useState<SignupForm>({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (data: SignupForm = form): SignupErrors => {
    const next: SignupErrors = {};
    const fullNameError = validateRequired(data.fullName, "Full name");
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);
    if (fullNameError) next.fullName = fullNameError;
    if (emailError) next.email = emailError;
    if (passwordError) next.password = passwordError;
    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setSubmitted(true);
  };

  const handleChange = (field: keyof SignupForm, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (submitted) {
      setErrors(validate(updated));
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start building your AI-powered resume today"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="signup-fullname"
          label="Full Name"
          type="text"
          name="fullName"
          autoComplete="name"
          placeholder="John Doe"
          value={form.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          error={errors.fullName}
        />

        <FormField
          id="signup-email"
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
        />

        <PasswordInput
          id="signup-password"
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="Minimum 8 characters"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
        />

        <Button type="submit" size="lg" className="w-full">
          Create Account
        </Button>

        {submitted && Object.keys(errors).length === 0 && (
          <p className="text-center text-sm text-emerald-400" role="status">
            Account details validated successfully.
          </p>
        )}

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-brand-400 transition hover:text-brand-300 focus-ring rounded"
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
