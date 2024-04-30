// src/pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import dbConnect from '../../db/connection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Connect to MongoDB

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate and return access and refresh tokens
      const accessToken = await user.generateAuthToken();
      const refreshToken = await user.generateRefreshToken();

      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}