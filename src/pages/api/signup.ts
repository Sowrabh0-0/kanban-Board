// src/pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/User';
import dbConnect from '../../db/connection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Connect to MongoDB

  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Create a new user
      const newUser = new User({ name, email, password });
      await newUser.save();

      // Generate and return access and refresh tokens
      const accessToken = await newUser.generateAuthToken();
      const refreshToken = await newUser.generateRefreshToken();

      res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}