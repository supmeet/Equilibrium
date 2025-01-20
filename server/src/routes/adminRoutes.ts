import express from 'express';
import { adminLogin } from '../controllers/adminController';

const router = express.Router();

// Admin Login Route
router.post('/login', adminLogin);

export default router;