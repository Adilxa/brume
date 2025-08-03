// lib/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://84.54.12.45:5000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  sendOTP: async (email: string) => {
    const response = await api.post('/api/auth/otp', { email });
    return response.data;
  },

  verifyOTP: async (email: string, otpCode: string) => {
    const response = await api.post('/api/auth/verify', { email, otpCode });
    return response.data;
  },
};


export const userAPI = {
  getUserData: async (userId: string) => {
    const response = await api.get(`/api/user/${userId}`);
    return response.data;
  },
};

export default api;