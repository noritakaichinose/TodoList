"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const extractUserIdFromToken_1 = require("../utils/extractUserIdFromToken");
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, extractUserIdFromToken_1.extractUserIdFromToken)(req);
        const { title, completed } = req.body;
        const newTodo = new Todo_1.default({
            title,
            completed: completed || false,
            userId: userId
        });
        yield newTodo.save();
        res.status(201).json(newTodo);
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
});
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, extractUserIdFromToken_1.extractUserIdFromToken)(req);
        const todos = yield Todo_1.default.find({ userId: userId });
        res.status(200).json(todos);
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
});
exports.getTodos = getTodos;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, extractUserIdFromToken_1.extractUserIdFromToken)(req);
    if (!userId)
        return;
    try {
        const updateTodo = yield Todo_1.default.findByIdAndUpdate({ _id: req.params.id, userId }, req.body, { new: true });
        if (!updateTodo) {
            return res.status(401).json({ message: 'Todo not found or you do not have permission to update it' });
        }
        res.json(updateTodo);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, extractUserIdFromToken_1.extractUserIdFromToken)(req);
    if (!userId)
        return;
    try {
        const todo = yield Todo_1.default.findByIdAndUpdate({ _id: req.params.id, userId });
        if (!todo) {
            return res.status(401).json({ message: 'Todo not found or you do not have permission to delete it' });
        }
        res.json({ message: 'Todo deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteTodo = deleteTodo;
