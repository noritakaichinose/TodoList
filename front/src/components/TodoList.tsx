import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
	todos: Todo[];
	onDelete: (id: string) => void;
	onEdit: (id: string, updateTodo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onEdit }) => {
	if (!todos || todos.length === 0) {
		return <p>タスクはありません</p>
	}
	return (
		<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
			{todos.map(todo => (
				<TodoItem key={todo._id} todo={todo} onDelete={onDelete} onEdit={onEdit}/>
			))}
		</ul>
	);
}

export default TodoList