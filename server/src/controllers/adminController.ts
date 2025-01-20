// controllers/adminController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    // Check if user exists and is admin
    const user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid credentials or not an admin.' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    });

    // Set cookie
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Return response
    res.json({
      message: 'Login successful',
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
