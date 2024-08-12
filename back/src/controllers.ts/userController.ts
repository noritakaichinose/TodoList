import { Request, Response } from 'express';
import User from '../models/User';
import { extractUserIdFromToken } from '../utils/extractUserIdFromToken';

export const getUserDetails = async (req: Request, res: Response) => {
  const userId = extractUserIdFromToken(req);
  if (!userId) return;

  try {
    
    const getUser = await User.findById(userId);

    if (!getUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.status(200).json(getUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const userId = extractUserIdFromToken(req);
  if (!userId) return;

  try {
    const { email, password } = req.body;
    const updatedData: any = {};

    if (email) updatedData.email = email;
    if (password) updatedData.password = password;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json(updateUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = extractUserIdFromToken(req);
  if (!userId) return;

  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};