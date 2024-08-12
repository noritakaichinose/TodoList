import { Schema, model, Document } from "mongoose";
import Todo from "./Todo";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true }
});

UserSchema.pre('findOneAndDelete', async function (next) {
  const userId = this.getQuery()['_id'];
  await Todo.deleteMany({ userId });
  next();
});

export default model<IUser>('User', UserSchema);