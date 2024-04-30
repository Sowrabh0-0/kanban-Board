// models/Label.ts
import mongoose, { Document, Model } from 'mongoose';

interface ILabel extends Document {
  name: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const labelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Label: Model<ILabel> = mongoose.model<ILabel>('Label', labelSchema);
export default Label;
