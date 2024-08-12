import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface TaskFormProps {
  onAddTodo: (title: string) => void;
}

const TodoForm: React.FC<TaskFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title);
      setTitle('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
      <TextField
        label="新規タスクを追加"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      
      <Button type="submit" variant="contained" color="primary" sx={{ height: '50%' }}>
        +
      </Button>
    </Box>
  );
}

export default TodoForm;