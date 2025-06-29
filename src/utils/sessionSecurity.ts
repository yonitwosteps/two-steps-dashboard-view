
// Session security utilities
export class SessionSecurity {
  private static readonly SESSION_KEY = 'auth_session';
  private static readonly CSRF_KEY = 'csrf_token';

  // Generate a secure random token
  static generateCSRFToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Set session with security measures
  static setSession(userData: any): void {
    const sessionData = {
      user: userData,
      timestamp: Date.now(),
      csrf: this.generateCSRFToken()
    };

    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
      localStorage.setItem(this.CSRF_KEY, sessionData.csrf);
    } catch (error) {
      console.error('Failed to set session');
      throw new Error('Session storage failed');
    }
  }

  // Get session with validation
  static getSession(): any {
    try {
      const sessionStr = localStorage.getItem(this.SESSION_KEY);
      const csrfToken = localStorage.getItem(this.CSRF_KEY);

      if (!sessionStr || !csrfToken) {
        return null;
      }

      const sessionData = JSON.parse(sessionStr);
      
      // Validate CSRF token
      if (sessionData.csrf !== csrfToken) {
        this.clearSession();
        return null;
      }

      // Check session age (24 hours)
      const maxAge = 24 * 60 * 60 * 1000;
      if (Date.now() - sessionData.timestamp > maxAge) {
        this.clearSession();
        return null;
      }

      return sessionData.user;
    } catch (error) {
      this.clearSession();
      return null;
    }
  }

  // Clear session securely
  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.CSRF_KEY);
  }

  // Get CSRF token for requests
  static getCSRFToken(): string | null {
    return localStorage.getItem(this.CSRF_KEY);
  }
}
