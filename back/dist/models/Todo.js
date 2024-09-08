"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true }
});
exports.default = (0, mongoose_1.model)('Todo', TodoSchema);
