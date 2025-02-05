import express from 'express';
import { signup, verifyEmail, login } from '../controllers/userAuthController';
import { getFriends, addFriend, removeFriend } from "../controllers/userController";
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/login', login);

router.get("/friends/", verifyToken, getFriends);
router.post("/friends/add", verifyToken, addFriend);
router.delete("/friends/remove/:friendId", verifyToken, removeFriend);

export default router;


