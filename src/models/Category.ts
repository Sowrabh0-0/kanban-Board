// models/Category.ts
import mongoose, { Document, Model } from 'mongoose';

interface ICategory extends Document {
  name: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Link to the user for personalized categories
});

const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
