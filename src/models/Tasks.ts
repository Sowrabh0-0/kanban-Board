// models/Task.ts
import mongoose, { Document, Model } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  labels: string[];
  categoryId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
}

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  labels: [{ type: String }],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Task: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);
export default Task;
