import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  email: string;
  role: "user" | "admin";
  password: string;
  verificationCode?: string;
  isVerified: boolean;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  profileImage?: string;
  preferences?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true, trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    password: { type: String, required: true },
    verificationCode: { type: String }, // Optional unless required explicitly
    isVerified: { type: Boolean, default: false },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    nickname: { type: String, trim: true },
    profileImage: { type: String },
    preferences: { type: Object, default: {} },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User; // Default export for compatibility
