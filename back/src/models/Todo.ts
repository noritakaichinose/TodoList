import { Schema, model, Types, Document } from "mongoose";

interface ITodo extends Document {
  title: string;
  completed: boolean;
  userId: Types.ObjectId;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: Types.ObjectId, ref: 'User', required: true }
});

export default model<ITodo>('Todo', TodoSchema);