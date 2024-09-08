import React, { useEffect, useReducer } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { isValidEmail } from '../utils/ValidationEmail';
import { reducer, initialState } from '../reducers/authReducer';

interface AuthFormProps {
  type: 'register' | 'login';
  onSubmit: (email: string, password: string, username?: string) => Promise<void>;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, error }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_ERROR', payload: null });

    if (!isValidEmail(state.email)) {
      dispatch({ type: 'SET_ERROR', payload: 'メールアドレスの形式が正しくありません' });
      return;
    }

    try {
      await onSubmit(state.email, state.password, state.username);
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    if (error !== null) {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  }, [error]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {state.error && <Alert severity="error">{state.error}</Alert>}
      {type === 'register' && (
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="ユーザー名"
          name="username"
          autoComplete="username"
          autoFocus
          value={state.username}
          onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
        />
      )}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="メールアドレス"
        name="email"
        autoComplete="email"
        value={state.email}
        onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="パスワード"
        type="password"
        id="password"
        autoComplete="current-password"
        value={state.password}
        onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        {type === 'register' ? '登録' : 'ログイン'}
      </Button>
    </Box>
  );
};

export default AuthForm;