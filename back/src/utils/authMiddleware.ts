import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Authorizationヘッダーを取得
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missin '});
  }

  // Bearerトークンを分離
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Toekn missing' });
  }

  try {
    // トークンの検証
    const decodedToken = jwt.verify(token, 'YOUR_SECRET_KEY') as JwtPayload;

    // デコードされたトークンからuserIdをリクエストオブジェクトに保存
    req.userData = { userId: decodedToken.userId as string | JwtPayload };

    // 次のミドルウェアまたはルートハンドラに制御を渡す
    next();
  } catch (err: any) {
    return res.status(401).json({ message: 'Invalid or expired token '});
  }
}

export default authMiddleware;