
// Webhook configuration with environment variable support and security
export const WEBHOOK_CONFIG = {
  LOGIN_WEBHOOK: import.meta.env.VITE_LOGIN_WEBHOOK_URL || 'https://twosteps.app.n8n.cloud/webhook/167477c9-c4a2-47a3-8823-f5067705b880',
  SIGNUP_WEBHOOK: import.meta.env.VITE_SIGNUP_WEBHOOK_URL || 'https://twosteps.app.n8n.cloud/webhook/236f4d2c-7eb7-4f01-80cd-f4bb24703944',
  FORGOT_PASSWORD_WEBHOOK: import.meta.env.VITE_FORGOT_PASSWORD_WEBHOOK_URL || 'https://twosteps.app.n8n.cloud/webhook/71f232d5-b882-439b-8cb4-0341585e48f9',
  FOLLOW_UP_WEBHOOK: import.meta.env.VITE_FOLLOW_UP_WEBHOOK_URL || 'https://twosteps.app.n8n.cloud/webhook/072ecdd7-9882-452c-a82f-f60373aa8afc',
  BLACKLIST_WEBHOOK: import.meta.env.VITE_BLACKLIST_WEBHOOK_URL || 'https://twosteps.app.n8n.cloud/webhook/fa7497e1-8e4f-4866-99e7-5973d713c0e3',
  LEADS_FETCH_WEBHOOK: import.meta.env.VITE_LEADS_FETCH_WEBHOOK_URL || 'https://twosteps.app.n8n.cloud/webhook/4e9c82bb-4de3-4212-ad72-a1c82b148cc1',
  SCRAPER_WEBHOOK: import.meta.env.VITE_SCRAPER_WEBHOOK_URL || 'https://twosteps.app.n8n.cloud/webhook/118da37f-9a78-4335-b2df-c001629ca8c1',
} as const;

// Validate webhook URL format
export const isValidWebhookUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'https:' && parsedUrl.hostname.length > 0;
  } catch {
    return false;
  }
};

// Security headers for webhook requests
export const getSecurityHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  // Add CSRF token if available
  const csrfToken = localStorage.getItem('csrf_token');
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  return headers;
};
