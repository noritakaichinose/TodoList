import axios from 'axios';
import { getToken } from './authService';

const API_URL = `https://todo-list-back-rust.vercel.app`;

export const getUserDetails = async () => {
  const token = getToken();

  try {
    const response = await axios.get(`${API_URL}/api/user/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (err: any) {
    console.error('アカウント情報の取得に失敗しました');
    throw new Error(err.response?.data?.message);
  }
};

export const updateUser = async (email: string, password: string) => {
  const token = getToken();

  try {
    const response = await axios.put(`${API_URL}/api/user/update`, { email, password }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response
  } catch (err: any) {
    console.error('アカウント情報の更新に失敗しました');
    throw new Error(err.response?.data?.message);
  }
};

export const deleteUser = async () => {
  const token = getToken();
  try {
    const response = await axios.delete(`${API_URL}/api/user/delete`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (err: any) {
    console.error('アカウントの削除に失敗しました');
    throw new Error(err.response?.data?.message);
  }
};