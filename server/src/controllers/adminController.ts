// controllers/adminController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Group from '../models/Group';
import SplitType from '../models/SplitType';
import Expense from '../models/Expense';
import Settlement from '../models/Settlement';
import Log from '../models/Log';

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
    res.cookie('jwt', token, { httpOnly: true, secure: false, sameSite: true, maxAge: 3600000 });

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

export const getMasterCounts = async (req: Request, res: Response): Promise<any> => {
  try {
    const userCount = await User.countDocuments();
    const groupCount = await Group.countDocuments();
    const splitTypeCount = await SplitType.countDocuments();
    const expenseCount = await Expense.countDocuments();
    const settlementCount = await Settlement.countDocuments();
    const logCount = await Log.countDocuments();

    res.json({
      users: userCount,
      groups: groupCount,
      splitTypes: splitTypeCount,
      expenses: expenseCount,
      settlements: settlementCount,
      logs: logCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch master counts." });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, isAdmin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, 
      role: isAdmin ? 'admin' : 'user',
      isVerified: true,
    });
    console.log("New User Details",newUser);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error",error);
    res.status(500).json({ message: "Error creating user", error: error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { firstName, lastName, email, password, isAdmin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, password: hashedPassword, role: isAdmin ? 'admin' : 'user' },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};