import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";
import PasswordInput from "../components/auth/PasswordInput";
import Button from "../components/ui/Button";
import { validateEmail, validatePassword } from "../utils/validation";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (data: LoginForm = form): LoginErrors => {
    const next: LoginErrors = {};
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);
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

  const handleChange = (field: keyof LoginForm, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (submitted) {
      setErrors(validate(updated));
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue building your resume"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="login-email"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
        />

        <PasswordInput
          id="login-password"
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
        />

        <Button type="submit" size="lg" className="w-full">
          Log in
        </Button>

        {submitted && Object.keys(errors).length === 0 && (
          <p className="text-center text-sm text-emerald-400" role="status">
            Login validated successfully.
          </p>
        )}

        <p className="text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="font-medium text-brand-400 transition hover:text-brand-300 focus-ring rounded"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
