import axios from 'axios';
import { getToken } from './authService';
import { Todo } from '../types/todo';

const URL = process.env.BACKEND_URL;

export const fetchTodos = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${URL}/api/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (err: any) {
    console.error('Todoリストの取得失敗:', err);
    throw new Error(err.response?.data?.message);
  }
};

export const addTodo = async (title: string) => {
  const token = getToken();
  try {
    const response = await axios.post(`${URL}/api/add`, { title }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (err: any) {
    console.error('Todoの追加失敗:', err);
    throw new Error(err.response?.data?.message);
  }
};

export const deleteTodo = async (id: string) => {
  const token = getToken();
  try {
    await axios.delete(`${URL}/api/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (err: any) {
    console.error('Todoの削除失敗:');
    throw new Error(err.response?.data?.message);
  }
};

export const editTodo = async (id: string, updatedTodo: Todo) => {
  const token = getToken();
  try {
    const response = await axios.put(`${URL}/api/update/${id}`, updatedTodo, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (err: any) {
    console.error('Todoの更新失敗:', err);
    throw new Error(err.response?.data?.message);
  }
};