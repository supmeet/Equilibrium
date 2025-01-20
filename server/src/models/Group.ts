import { Schema, model, Document } from 'mongoose';

interface IGroup extends Document {
  name: string;
  description: string;
  members: string[]; // Array of user IDs
  createdBy: string; // User ID of the creator
}

const groupSchema = new Schema<IGroup>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: [String], required: true },
  createdBy: { type: String, required: true },
}, { timestamps: true });

const Group = model<IGroup>('Group', groupSchema);

export default Group;
