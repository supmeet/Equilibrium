import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Types } from "mongoose";

// Get Friend List
export const getFriends = async (req: Request, res: Response):Promise<any> => {
    try {
      const userId = (req as any).user.id; // Assuming user is authenticated
      const user = await User.findById(userId).populate("friends", "firstName lastName");
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const friends = (user.friends as { _id: Types.ObjectId; firstName?: string; lastName?: string }[]).map(friend => ({
        id: friend._id,
        name: `${friend.firstName ?? ""} ${friend.lastName ?? ""}`.trim(),
        balance: 0, // Replace with actual logic for balance calculation
      }));
  
      res.json(friends);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Add Friend
  export const addFriend = async (req: Request, res: Response):Promise<any>=> {
    try {
      const userId = (req as any).user.id;
      const { friendEmail } = req.body;
  
      const friend = await User.findOne({ email: friendEmail });
      if (!friend) return res.status(404).json({ message: "Friend not found" });
  
      if (userId === friend.id) return res.status(400).json({ message: "You cannot add yourself" });
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (user.friends.some((id) => id.toString() === ((friend as any)._id.toString()))) {
        return res.status(400).json({ message: "Friend already added" });
      }
  
      user.friends.push((friend as any)._id);
      user.friendBalances.set((friend as any)._id.toString(), 0);
      await user.save();
  
      res.json({ message: "Friend added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Remove Friend
  export const removeFriend = async (req: Request, res: Response):Promise<any> => {
    try {
      const userId = (req as any).user.id;
      const { friendId } = req.params;
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.friends = user.friends.filter(id => id.toString() !== friendId);
      user.friendBalances.delete(friendId);
      await user.save();
  
      res.json({ message: "Friend removed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };