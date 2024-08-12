import Todo from '../models/Todo';
import { Request, Response } from 'express';
import { extractUserIdFromToken } from '../utils/extractUserIdFromToken';

export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = extractUserIdFromToken(req);

    const { title, completed } = req.body;

    const newTodo = new Todo({
      title,
      completed: completed || false,
      userId: userId
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = extractUserIdFromToken(req);

    const todos = await Todo.find({ userId: userId });
    
    res.status(200).json(todos);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const userId = extractUserIdFromToken(req);
  if (!userId) return;

  try {
    const updateTodo = await Todo.findByIdAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );
    if (!updateTodo) {
      return res.status(401).json({ message: 'Todo not found or you do not have permission to update it' });
    }
    res.json(updateTodo);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const userId = extractUserIdFromToken(req);
  if (!userId) return;

  try {
    const todo = await Todo.findByIdAndUpdate({ _id: req.params.id, userId });
    if (!todo) {
      return res.status(401).json({ message: 'Todo not found or you do not have permission to delete it' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};