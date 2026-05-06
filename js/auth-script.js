// Universal authentication script for all pages
class AuthManager {
  constructor() {
    this.token = localStorage.getItem('authToken');
    this.userId = null;
    this.username = null;
    this.init();
  }
  
  async init() {
    // Page load တိုင်း verify လုပ်
    const isValid = await this.verify();
    if (!isValid) {
      this.redirectToLogin();
    }
  }
  
  async verify() {
    try {
      const response = await fetch('/api/verify', {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      
      if (!response.ok) throw new Error('Invalid token');
      
      const user = await response.json();
      this.userId = user.userId;
      this.username = user.username;
      return true;
    } catch (error) {
      console.log('Auth failed:', error);
      return false;
    }
  }
  
  async loadUserData(endpoint) {
    const response = await fetch(`/api/${endpoint}/${this.userId}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
    return await response.json();
  }
  
  logout() {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
  }
  
  redirectToLogin() {
    window.location.href = 'login.html';
  }
  
  getUserId() {
    return this.userId;
  }
}

// Global auth instance
window.auth = new AuthManager();
