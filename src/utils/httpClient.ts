
import { isValidWebhookUrl } from '@/config/webhooks';

// HTTP client with security enhancements
export class SecureHttpClient {
  private static readonly TIMEOUT = 10000; // 10 seconds
  private static readonly MAX_RETRIES = 3;

  static async post(url: string, data: unknown, options: RequestInit = {}) {
    // Validate URL
    if (!isValidWebhookUrl(url)) {
      throw new Error('Invalid webhook URL provided');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      signal: controller.signal,
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
      signal: controller.signal,
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
}
