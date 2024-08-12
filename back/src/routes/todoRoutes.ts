import { Router, Request, Response } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers.ts/todoControlle";
import authMiddleware from "../utils/authMiddleware";
import Todo from '../models/Todo';

const router = Router();

router.get('/', authMiddleware, getTodos);

router.post('/add', authMiddleware, createTodo);

router.put('/update/:id', authMiddleware, updateTodo);

router.delete('/delete/:id', authMiddleware, deleteTodo);

export default router;