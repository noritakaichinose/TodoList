import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

export const extractUserIdFromToken = (req: Request): string => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Token missing');
  }

  let decodedToken: string | JwtPayload;
  try {
    decodedToken = jwt.verify(token, 'YOUR_SECRET_KEY');
  } catch (err) {
    throw new Error('Invalid or expired token');
  }

  const userId = typeof decodedToken !== 'string' ? decodedToken.userId : null;

  if (!userId) {
    throw new Error('User ID not found in token' );
  }

  return userId;
}