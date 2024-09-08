"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers.ts/userController");
const authMiddleware_1 = __importDefault(require("../utils/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.default, userController_1.getUserDetails);
router.put('/update', authMiddleware_1.default, userController_1.updateUser);
router.delete('/delete', authMiddleware_1.default, userController_1.deleteUser);
exports.default = router;
