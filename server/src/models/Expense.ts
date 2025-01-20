import { Schema, model, Document } from 'mongoose';

interface IExpense extends Document {
  groupId: string; // Group ID
  description: string;
  amount: number;
  splitTypeId: string; // Split type ID
  paidBy: string; // User ID
  participants: string[]; // Array of user IDs
}

const expenseSchema = new Schema<IExpense>({
  groupId: { type: String,defaultValue: "0"},
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  splitTypeId: { type: String, required: true },
  paidBy: { type: String, required: true },
  participants: { type: [String], required: true },
}, { timestamps: true });

const Expense = model<IExpense>('Expense', expenseSchema);

export default Expense;
