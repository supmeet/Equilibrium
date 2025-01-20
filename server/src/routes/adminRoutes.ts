import express from 'express';
import { adminLogin, getMasterCounts, createUser, updateUser, deleteUser, getUsers } from '../controllers/adminController';
import { authenticateAdmin } from '../middleware/auth';

const router = express.Router();

// Admin Login Route
router.post('/login', adminLogin);
router.get('/masterCounts', getMasterCounts);
router.get('/user/list', authenticateAdmin, getUsers); // Get list of users
router.post('/user/create', createUser); // Create new user
router.put('/user/:userId', updateUser); // Update user
router.delete('/user/:userId', deleteUser); // Delete user

export default router;