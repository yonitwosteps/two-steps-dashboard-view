
import { isValidWebhookUrl, getSecurityHeaders } from '@/config/webhooks';

// Enhanced HTTP client with security measures
export class SecureHttpClient {
  private static readonly TIMEOUT = 10000; // 10 seconds
  private static readonly MAX_RETRIES = 3;

  static async post(url: string, data: unknown, options: RequestInit = {}) {
    // Validate URL
    if (!isValidWebhookUrl(url)) {
      throw new Error('Invalid webhook URL provided');
    }

    // Sanitize data to prevent injection attacks
    const sanitizedData = this.sanitizeRequestData(data);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        ...getSecurityHeaders(),
        ...options.headers,
      },
      body: JSON.stringify(sanitizedData),
      signal: controller.signal,
      credentials: 'same-origin',
      ...options,
    };

    try {
      const response = await fetch(url, requestOptions);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - please try again');
        }
        throw error;
      }
      
      throw new Error('An unexpected error occurred');
    }
  }

  static async get(url: string, options: RequestInit = {}) {
    // Validate URL
    if (!isValidWebhookUrl(url)) {
      throw new Error('Invalid webhook URL provided');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        ...getSecurityHeaders(),
        ...options.headers,
      },
      signal: controller.signal,
      credentials: 'same-origin',
      ...options,
    };

    try {
      const response = await fetch(url, requestOptions);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - please try again');
        }
        throw error;
      }
      
      throw new Error('An unexpected error occurred');
    }
  }

  // Sanitize request data to prevent XSS and injection attacks
  private static sanitizeRequestData(data: unknown): unknown {
    if (typeof data === 'string') {
      return data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+\s*=/gi, '');
    }

    if (typeof data === 'object' && data !== null) {
      const sanitized: any = Array.isArray(data) ? [] : {};
      
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = this.sanitizeRequestData(value);
      }
      
      return sanitized;
    }

    return data;
  }
}
