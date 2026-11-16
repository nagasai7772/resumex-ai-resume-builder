const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): string | undefined => {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required";
  if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address";
  return undefined;
};

export const validatePassword = (
  password: string,
  minLength = 8
): string | undefined => {
  if (!password) return "Password is required";
  if (password.length < minLength)
    return `Password must be at least ${minLength} characters`;
  return undefined;
};

export const validateRequired = (
  value: string,
  fieldName: string
): string | undefined => {
  if (!value.trim()) return `${fieldName} is required`;
  return undefined;
};
