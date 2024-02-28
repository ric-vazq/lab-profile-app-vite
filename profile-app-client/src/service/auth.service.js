import axios from 'axios';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.Server_URL || 'http://localhost:5005',
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config; 
    });
  }

  signUp = (body) => {
    return this.api.post('/auth/signup', body)
  }

  logIn = (body) => {
    return this.api.post('auth/login', body)
  }

  verifyToken = () => {
    return this.api.get('auth/verify')
  }

  uploadPhoto = (body) => {
    return this.api.post('api/upload', body)
  }

  getCurrentUser = () => {
    return this.api.get('api/users')
  }

  editUser = (body) => {
    return this.api.put('api/users', body)
  }
}

const authService = new AuthService(); 

export default authService; 
