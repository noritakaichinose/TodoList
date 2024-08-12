export type State = {
  username: string;
  currentEmail: string;
  email: string;
  password: string;
  error: string | null;
  success: string | null;
  open: boolean;
  isEditing: boolean;
};

export type Action =
  | { type: 'SET_USER_DETAILS'; payload: { username: string; email: string } }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SUCCESS'; payload: string | null }
  | { type: 'TOGGLE_EDIT'; payload: boolean }
  | { type: 'TOGGLE_DIALOG'; payload: boolean }
  | { type: 'RESET_FORM' };

export const initialState: State = {
  username: '',
  currentEmail: '',
  email: '',
  password: '',
  error: null,
  success: null,
  open: false,
  isEditing: false,
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return {
        ...state,
        username: action.payload.username,
        currentEmail: action.payload.email,
        email: action.payload.email
      };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    case 'TOGGLE_EDIT':
      return { ...state, isEditing: action.payload };
    case 'TOGGLE_DIALOG':
      return { ...state, open: action.payload };
    case 'RESET_FORM':
      return {
        ...state,
        email: '',
        password: '',
        error: null,
        success: null,
        isEditing: false,
        open: false
      };
    default:
      return state;
  }
};
