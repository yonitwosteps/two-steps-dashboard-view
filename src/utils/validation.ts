
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

// Sanitize string input to prevent XSS
export const sanitizeString = (input: string): string => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+\s*=/gi, '');
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
