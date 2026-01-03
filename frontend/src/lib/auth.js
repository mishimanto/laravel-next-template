import { jwtDecode } from 'jwt-decode';

class AuthService {
  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  getUser() {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  getUserRole() {
    const user = this.getUser();
    return user?.role || null;
  }

  isAdmin() {
    const role = this.getUserRole();
    return role === 'admin' || role === 'super_admin';
  }

  isSuperAdmin() {
    const role = this.getUserRole();
    return role === 'super_admin';
  }

  isUser() {
    const role = this.getUserRole();
    return role === 'user';
  }

  logout() {
    this.removeToken();
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.href = '/login';
    }
  }
}

export default new AuthService();