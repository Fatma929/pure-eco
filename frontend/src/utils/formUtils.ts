/**
 * Form utilities and helpers for auth and other forms
 */

export interface FormError {
  field: string;
  message: string;
}

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check password strength
 */
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 6) {
    score += 1;
  }
  if (password.length >= 12) {
    score += 1;
    feedback.push('Good length');
  }
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 1;
    feedback.push('Mixed case letters');
  }
  if (/\d/.test(password)) {
    score += 1;
    feedback.push('Contains numbers');
  }
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
    feedback.push('Contains special characters');
  }

  return { score: Math.min(score, 5), feedback };
};

/**
 * Format error response from API
 */
export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String(error.message);
  }
  return 'An unexpected error occurred';
};

/**
 * Debounce function for form field validation
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: unknown[]) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function executedFunction(...args: unknown[]): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Sanitize user input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Get user initials from email or name
 */
export const getInitials = (identifier: string): string => {
  return identifier.charAt(0).toUpperCase();
};
