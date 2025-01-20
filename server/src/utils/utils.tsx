import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export { signToken, verifyToken };
