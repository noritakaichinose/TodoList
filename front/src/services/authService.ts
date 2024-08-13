import axios from 'axios';

const API_URL = `https://todo-list-back-rust.vercel.app/`;

export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password });
    return response.data;
  } catch (err: any) {
    console.error('アカウント登録失敗:', err);
    throw new Error(err.response?.data?.message);
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
  } catch (err: any) {
    console.error('ログイン失敗:', err);
    throw new Error(err.response?.data?.message);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
}

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
}