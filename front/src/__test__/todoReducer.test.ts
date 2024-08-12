import { todoReducer, initialState, State, Action } from '../reducers/todoReducers';
import { Todo } from '../types/todo';

describe('todoReducer', () => {
  it('should return the initial state', () => {
    expect(todoReducer(undefined, {} as Action)).toEqual(initialState);
  });

  it('should handle SET_TODOS', () => {
    const todos: Todo[] = [
      { _id: '1', title: 'Test Todo', completed: false },
      { _id: '2', title: 'Another Test Todo', completed: true },
    ];
    const action: Action = { type: 'SET_TODOS', payload: todos };
    const expectedState: State = { ...initialState, todos };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_TODO', () => {
    const newTodo: Todo = { _id: '3', title: 'New Todo', completed: false };
    const action: Action = { type: 'ADD_TODO', payload: newTodo };
    const expectedState: State = {
      ...initialState,
      todos: [...initialState.todos, newTodo],
    };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_TODO', () => {
    const initialState: State = {
      todos: [
        { _id: '1', title: 'Test Todo', completed: false },
        { _id: '2', title: 'Another Test Todo', completed: true },
      ],
      filter: 'all',
    };
    const action: Action = { type: 'DELETE_TODO', payload: '1' };
    const expectedState: State = {
      ...initialState,
      todos: [{ _id: '2', title: 'Another Test Todo', completed: true }],
    };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_FILTER', () => {
    const action: Action = { type: 'SET_FILTER', payload: 'completed' };
    const expectedState: State = { ...initialState, filter: 'completed' };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });
});
