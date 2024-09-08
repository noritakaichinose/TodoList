"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoControlle_1 = require("../controllers.ts/todoControlle");
const authMiddleware_1 = __importDefault(require("../utils/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.default, todoControlle_1.getTodos);
router.post('/add', authMiddleware_1.default, todoControlle_1.createTodo);
router.put('/update/:id', authMiddleware_1.default, todoControlle_1.updateTodo);
router.delete('/delete/:id', authMiddleware_1.default, todoControlle_1.deleteTodo);
exports.default = router;
