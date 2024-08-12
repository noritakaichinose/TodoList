import { Todo } from '../types/todo';

export type State = {
  todos: Todo[];
  filter: string;
};

export type Action =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; updatedTodo: Todo } }
  | { type: 'SET_FILTER'; payload: string };

export const initialState: State = {
  todos: [],
  filter: 'all'
};

export const todoReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo._id !== action.payload) };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => 
          todo._id === action.payload.id ? action.payload.updatedTodo : todo
        ),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};