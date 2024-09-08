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
exports.deleteUser = exports.updateUser = exports.getUserDetails = void 0;
const User_1 = __importDefault(require("../models/User"));
const extractUserIdFromToken_1 = require("../utils/extractUserIdFromToken");
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, extractUserIdFromToken_1.extractUserIdFromToken)(req);
    if (!userId)
        return;
    try {
        const getUser = yield User_1.default.findById(userId);
        if (!getUser) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json(getUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getUserDetails = getUserDetails;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, extractUserIdFromToken_1.extractUserIdFromToken)(req);
    if (!userId)
        return;
    try {
        const { email, password } = req.body;
        const updatedData = {};
        if (email)
            updatedData.email = email;
        if (password)
            updatedData.password = password;
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.json(exports.updateUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, extractUserIdFromToken_1.extractUserIdFromToken)(req);
    if (!userId)
        return;
    try {
        const deleteUser = yield User_1.default.findByIdAndDelete(userId);
        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteUser = deleteUser;
