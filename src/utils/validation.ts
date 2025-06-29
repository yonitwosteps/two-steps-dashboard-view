
import { z } from 'zod';

// Lead data validation schema
export const LeadSchema = z.object({
  name: z.string().optional(),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  title: z.string().optional(),
  organization: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  sanitized_phone: z.union([z.number(), z.string()]).optional(),
  email: z.string().email().optional().or(z.literal('')),
  twitter_url: z.string().url().optional().or(z.literal('')),
});

// Search query validation
export const SearchQuerySchema = z.object({
  query: z.string().min(1, 'Search query cannot be empty').max(500, 'Search query is too long'),
});

// Enhanced XSS prevention
export const sanitizeString = (input: string): string => {
  return input
    // Remove script tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove javascript: URLs
    .replace(/javascript:/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove data: URLs that could contain scripts
    .replace(/data:\s*text\/html/gi, 'data:text/plain')
    // Remove vbscript: URLs
    .replace(/vbscript:/gi, '')
    // Remove style expressions
    .replace(/expression\s*\(/gi, '')
    // Remove import statements
    .replace(/@import/gi, '')
    .trim();
};

// Sanitize HTML content more thoroughly
export const sanitizeHtml = (input: string): string => {
  const allowedTags = ['b', 'i', 'em', 'strong', 'p', 'br'];
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  
  return input.replace(tagRegex, (match, tagName) => {
    return allowedTags.includes(tagName.toLowerCase()) ? match : '';
  });
};

// Validate and sanitize lead data
export const validateAndSanitizeLead = (lead: unknown) => {
  const parsed = LeadSchema.parse(lead);
  
  // Sanitize string fields
  if (parsed.name) parsed.name = sanitizeString(parsed.name);
  if (parsed.title) parsed.title = sanitizeString(parsed.title);
  if (parsed.organization) parsed.organization = sanitizeString(parsed.organization);
  if (parsed.country) parsed.country = sanitizeString(parsed.country);
  if (parsed.city) parsed.city = sanitizeString(parsed.city);
  
  return parsed;
};

// Additional security utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{7,15}$/;
  return phoneRegex.test(phone);
};
