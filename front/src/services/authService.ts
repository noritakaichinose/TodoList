import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, { username, email, password });
    return response.data;
  } catch (err: any) {
    console.error('アカウント登録失敗:', err);
    throw new Error(err.response?.data?.message);
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
    const token = response.data.token;
    sessionStorage.setItem('token', token);
    return token;
  } catch (err: any) {
    console.error('ログイン失敗:', err);
    throw new Error(err.response?.data?.message);
  }
};

export const logout = () => {
  sessionStorage.removeItem('token');
}

export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const isAuthenticated = (): boolean => {
  const token = sessionStorage.getItem('token');
  return !!token;
}