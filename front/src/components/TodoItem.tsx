import React, { useState } from 'react';
import { ListItem, Checkbox, IconButton, ListItemText, ListItemSecondaryAction, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../types/todo';

interface TodoItemProps {
	todo: Todo;
	onDelete: (id: string) => void;
	onEdit: (id: string, updateTodo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editingTitle, setEditingTitle] = useState<string>(todo.title);
	
	const handleToggle = () => {
		onEdit(todo._id, { ...todo, completed: !todo.completed });
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		onEdit(todo._id, { ...todo, title: editingTitle });
		setIsEditing(false);
	};

	return (
		<ListItem>
			<Checkbox
				edge="start"
				checked={todo.completed}
				tabIndex={-1}
				disableRipple
				onChange={handleToggle}
			/>
			{isEditing ? (
				<TextField
					value={editingTitle}
					onChange={(e) => setEditingTitle(e.target.value)}
					onBlur={handleSave}
					autoFocus
				/>
			) : (
				<ListItemText primary={todo.title} onClick={handleEdit}/>
			)}
			<ListItemSecondaryAction>
				<IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo._id)}>
					<DeleteIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default TodoItem;