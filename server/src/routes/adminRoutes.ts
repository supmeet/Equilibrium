import express from 'express';
import { adminLogin, getMasterCounts, createUser, updateUser, deleteUser, getUsers } from '../controllers/adminController';
import { authenticateAdmin } from '../middleware/auth';

const router = express.Router();

// Admin Login Route
router.post('/login', authenticateAdmin, adminLogin);
router.get('/masterCounts', authenticateAdmin, getMasterCounts);
router.get('/user/list', authenticateAdmin, getUsers); // Get list of users
router.post('/user/create', authenticateAdmin, createUser); // Create new user
router.put('/user/:userId', authenticateAdmin, updateUser); // Update user
router.delete('/user/:userId', authenticateAdmin, deleteUser); // Delete user

export default router;