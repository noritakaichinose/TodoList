import axios from 'axios';
import { getToken } from './authService';

export const getUserDetails = async () => {
  const token = getToken();

  try {
    const response = await axios.get(`http://localhost:5000/api/user/`, {
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
    const response = await axios.put(`http://localhost:5000/api/user/update`, { email, password }, {
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
    const response = await axios.delete(`http://localhost:5000/api/user/delete`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (err: any) {
    console.error('アカウントの削除に失敗しました');
    throw new Error(err.response?.data?.message);
  }
};