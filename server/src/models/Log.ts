import { Schema, model, Document } from 'mongoose';

interface ILog extends Document {
  type: string; // Log type (e.g., "expenseAdded", "settlementMade")
  message: string; // Description of the action
  userId: string; // User ID associated with the action
}

const logSchema = new Schema<ILog>({
  type: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: String, required: true },
}, { timestamps: true });

const Log = model<ILog>('Log', logSchema);

export default Log;
