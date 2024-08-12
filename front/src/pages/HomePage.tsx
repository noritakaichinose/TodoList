import React, { useEffect, useReducer } from 'react';
import { Paper, Container, Button } from '@mui/material';
import MainLayout from '../components/MainLayout';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { Todo } from '../types/todo';
import { todoReducer, initialState } from '../reducers/todoReducers';
import {
  fetchTodos as fetchTodosAPI,
  addTodo as addTodoAPI,
  editTodo as editTodoAPI,
  deleteTodo as deleteTodoAPI
} from '../services/apiServices';

const HomePage: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const fetchTodos = async () => {
    try {
      const response = await fetchTodosAPI();
      dispatch({ type: 'SET_TODOS', payload: Array.isArray(response.data) ? response.data : [] });
    } catch (err: any) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const response = await addTodoAPI(title);
      dispatch({ type: 'ADD_TODO', payload: response.data });
    } catch (err: any) {
      console.error('Error adding todo:', err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoAPI(id);
      dispatch({ type: 'DELETE_TODO', payload: id });
    } catch (err: any) {
      console.error('Error deleting todo:', err);
    }
  };

  const editTodo = async (id: string, updatedTodo: Todo) => {
    try {
      const response = await editTodoAPI(id, updatedTodo);
      dispatch({ type: 'EDIT_TODO', payload: { id, updatedTodo: response.data } });
    } catch (err: any) {
      console.error('Error editing todo:', err);
    }
  };

  const filteretTodos = () => {
    if (state.filter === 'completed') {
      return state.todos.filter(todo => todo.completed);
    } else if (state.filter === 'incompleted') {
      return state.todos.filter(todo => !todo.completed);
    }
    return state.todos;
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <MainLayout>
      <Container maxWidth="sm">
        <Paper elevation={3} sx ={{ padding: 2 }}>
          <TodoForm onAddTodo={addTodo} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <Button
              variant={state.filter === 'all' ? 'contained' : 'outlined'}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
            >
              すべて
            </Button>
            <Button
              variant={state.filter === 'completed' ? 'contained' : 'outlined'}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
            >
              完了
            </Button>
            <Button
              variant={state.filter === 'incompleted' ? 'contained' : 'outlined'}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: 'incompleted' })}>
              未完了
            </Button>
          </div>
          <TodoList todos={filteretTodos()} onDelete={deleteTodo} onEdit={editTodo} />
        </Paper>
      </Container>
    </MainLayout>
  );
}

export default HomePage;