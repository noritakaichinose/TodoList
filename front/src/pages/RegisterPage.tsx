import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { Container, Typography, Box } from '@mui/material';
import MainLayout from '../components/MainLayout';
import AuthForm from '../components/AuthForm';

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string, username?: string) => {
    try {
      await register(username!, email, password);
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <MainLayout>
      <Container maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            新規登録
          </Typography>
          <AuthForm type="register" onSubmit={handleRegister} error={error} />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              ユーザー登録済ですか？ <Link to="/login">ログイン</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default RegisterPage;