import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'このメールアドレスは既に使用されています' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed'});
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}