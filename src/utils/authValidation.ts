
import { z } from 'zod';

// Enhanced password validation schema
export const PasswordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password must contain at least one special character');

// Email validation schema
export const EmailSchema = z.string()
  .email('Please enter a valid email address')
  .max(254, 'Email address is too long');

// Phone number validation schema
export const PhoneSchema = z.string()
  .regex(/^\+?[\d\s\-\(\)]{7,15}$/, 'Please enter a valid phone number')
  .optional()
  .or(z.literal(''));

// Name validation schema
export const NameSchema = z.string()
  .min(1, 'Name is required')
  .max(50, 'Name is too long')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, apostrophes, and periods');

// Login validation schema
export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, 'Password is required')
});

// Signup validation schema
export const SignupSchema = z.object({
  firstName: NameSchema,
  lastName: NameSchema,
  email_address: EmailSchema,
  password: PasswordSchema,
  phone_number: PhoneSchema
});

// Forgot password validation schema
export const ForgotPasswordSchema = z.object({
  email: EmailSchema
});

// Rate limiting utility
export class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private readonly maxAttempts = 5;
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return false;
    }

    // Reset if window has passed
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return false;
    }

    // Increment attempts
    record.count++;
    record.lastAttempt = now;

    return record.count > this.maxAttempts;
  }

  getRemainingTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return 0;

    const elapsed = Date.now() - record.lastAttempt;
    return Math.max(0, this.windowMs - elapsed);
  }
}

export const authRateLimiter = new RateLimiter();
