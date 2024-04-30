// src/models/User.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  tokens: Array<{ token: string }>;
  refreshTokens: Array<{ token: string }>;
  generateAuthToken: () => Promise<string>;
  generateRefreshToken: () => Promise<string>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  tokens: [{ token: { type: String, required: true } }],
  refreshTokens: [{ token: { type: String, required: true } }]
});

// Pre-save hook to hash the user's password
userSchema.pre('save', async function (next) {
  const user = this as IUser;
  // Only hash the password if it has been modified (or is new)
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Method to generate an access token
userSchema.methods.generateAuthToken = async function (): Promise<string> {
  const user = this;
  const accessToken = jwt.sign({ _id: user._id.toString() }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
  user.tokens = user.tokens.concat({ token: accessToken });
  await user.save();
  return accessToken;
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = async function (): Promise<string> {
  const user = this;
  const refreshToken = jwt.sign({ _id: user._id.toString() }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
  user.refreshTokens = user.refreshTokens.concat({ token: refreshToken });
  await user.save();
  return refreshToken;
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
