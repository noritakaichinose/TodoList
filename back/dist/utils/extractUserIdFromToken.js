"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUserIdFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const extractUserIdFromToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('Authorization header missing');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error('Token missing');
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, 'YOUR_SECRET_KEY');
    }
    catch (err) {
        throw new Error('Invalid or expired token');
    }
    const userId = typeof decodedToken !== 'string' ? decodedToken.userId : null;
    if (!userId) {
        throw new Error('User ID not found in token');
    }
    return userId;
};
exports.extractUserIdFromToken = extractUserIdFromToken;
