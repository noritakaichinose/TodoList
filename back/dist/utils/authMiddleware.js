"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    // Authorizationヘッダーを取得
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missin ' });
    }
    // Bearerトークンを分離
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Toekn missing' });
    }
    try {
        // トークンの検証
        const decodedToken = jsonwebtoken_1.default.verify(token, 'YOUR_SECRET_KEY');
        // デコードされたトークンからuserIdをリクエストオブジェクトに保存
        req.userData = { userId: decodedToken.userId };
        // 次のミドルウェアまたはルートハンドラに制御を渡す
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token ' });
    }
};
exports.default = authMiddleware;
