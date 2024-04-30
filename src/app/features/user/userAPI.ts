// src/app/features/user/userAPI.ts
import axios from 'axios';

const API_URL = '/api/user/';

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}login`, { email, password });
  return response.data;
};

export const registerUser = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}register`, { name, email, password });
  return response.data;
};

export const getUserProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
