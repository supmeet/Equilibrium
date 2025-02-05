import mongoose, { Schema, Document, Model, Types } from "mongoose";

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
  friends: Types.ObjectId[]; // Array of user IDs
  friendBalances: Map<string, number>; // Ensure this is correctly typed
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true, trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    password: { type: String, required: true },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    nickname: { type: String, trim: true },
    profileImage: { type: String },
    preferences: { type: Object, default: {} },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    
    // Ensure friendBalances is stored correctly
    friendBalances: {
      type: Map,
      of: Number, // Ensures values in the Map are numbers
      default: new Map(), // Initializes as an empty Map
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
