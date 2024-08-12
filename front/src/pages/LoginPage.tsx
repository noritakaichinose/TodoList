import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { Container, Typography, Box } from '@mui/material';
import MainLayout from '../components/MainLayout';
import AuthForm from '../components/AuthForm';

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('ログインに失敗しました。ログイン情報を確かめてください');
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <AuthForm type="login" onSubmit={handleLogin} error={error} />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              アカウントがありませんか？ <Link to="/register">アカウント登録</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default LoginPage;