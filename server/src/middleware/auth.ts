import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

/**
 * Middleware to verify JWT and attach the authenticated user to the request object.
 */
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. Token missing.' });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string; role: string };

    // Fetch the user from the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Attach the user to the request object
    (req as any).user = user;

    // Move to the next middleware/handler
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

/**
 * Middleware to ensure the authenticated user is an admin.
 */
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }

  next();
};

/**
 * Middleware to ensure the authenticated user is a regular user.
 */
export const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (!user || user.role !== 'user') {
    return res.status(403).json({ message: 'User access required.' });
  }

  next();
};

/**
 * Middleware to authenticate and ensure only admins can access specific routes.
 */
export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ message: 'Admin access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string; role: string };

    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required.' });
    }

    (req as any).user = user;
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};
