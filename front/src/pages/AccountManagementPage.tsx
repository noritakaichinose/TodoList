import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser, getUserDetails } from '../services/userServies';
import { reducer, initialState } from '../reducers/userReducer';
import { Container, TextField, Button, Typography, Box, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MainLayout from '../components/MainLayout';

const AccountManagementPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // 読み込み時に現在のメールアドレスを取得
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      dispatch({ type: 'SET_USER_DETAILS', payload: { username: userDetails.username, email: userDetails.email } });
    };

    fetchUserDetails();
  }, []);


  // 編集画面切り替え用
  const handleEditOpen = () => {
    dispatch({ type: 'TOGGLE_EDIT', payload: true });
  };

  const handleEditClose = () => {
    dispatch({ type: 'TOGGLE_EDIT', payload: false });
    dispatch({ type: 'RESET_FORM' });
  };

  // 削除確認ダイアログ用
  const handleClickOpen = () => {
    dispatch({ type: 'TOGGLE_DIALOG', payload: true });
  };

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_DIALOG', payload: false });
  };

  // アカウント情報更新
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_SUCCESS', payload: null });

    try {
      await updateUser(state.email, state.password);
      dispatch({ type: 'SET_SUCCESS', payload: 'アカウントの更新が完了しました' });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'アカウントの更新が失敗しました' });
    }
  };

  // アカウント削除
  const handleDelete = async () => {
    try {
      await deleteUser();
      navigate('/register'); // アカウント削除後に登録ページへリダイレクト
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'アカウントの削除に失敗しました。もう一度試してください' });
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            アカウント管理
          </Typography>
          {state.isEditing ? (
            <Box component="form" onSubmit={handleUpdate} sx={{ mt: 1 }}>
              {state.error && <Alert severity="error">{state.error}</Alert>}
              {state.success && <Alert severity="success">{state.success}</Alert>}
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="新しいメールアドレス"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="新しいパスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
              />
              <Box sx={{ display: "flex", mt: 3, mb: 2 }}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleEditClose}
                >
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  更新
                </Button>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={handleClickOpen}
                sx={{ mt: 3, mb: 2 }}
              >
                アカウント削除
              </Button>
            </Box>
            
          ) : (
            <Box sx={{ mt: 4, width: '100%' }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  ユーザー名
                </Typography>
                <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                  {state.username}
                </Typography>
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                現在のメールアドレス
              </Typography>
              <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                {state.currentEmail}
              </Typography>

              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleEditOpen}
                sx={{ mt: 3, mb: 2 }}
              >
                アカウント情報変更
              </Button>
            </Box>
          )}

          <Dialog
            open={state.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"アカウント削除の確認"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                本当にアカウントを削除しますか？この操作は元に戻せません。
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                いいえ
              </Button>
              <Button onClick={handleDelete} color="error" autoFocus>
                はい
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default AccountManagementPage;