import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    userData?: { userId: string | JwtPayload }
  }
}