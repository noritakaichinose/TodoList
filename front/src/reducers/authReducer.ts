export interface State {
  email: string;
  password: string;
  username?: string;
  error: string | null;
}

export type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null };

export const initialState: State = {
  email: '',
  password: '',
  username: '',
  error: null,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};