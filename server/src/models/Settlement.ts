import { Schema, model, Document } from 'mongoose';

interface ISettlement extends Document {
  groupId: string; // Group ID
  payerId: string; // User ID (payer)
  payeeId: string; // User ID (payee)
  amount: number;
}

const settlementSchema = new Schema<ISettlement>({
  groupId: { type: String, required: true },
  payerId: { type: String, required: true },
  payeeId: { type: String, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Settlement = model<ISettlement>('Settlement', settlementSchema);

export default Settlement;
