import { Schema, model, Document } from 'mongoose';

interface ISplitType extends Document {
  name: string;
  description: string;
}

const splitTypeSchema = new Schema<ISplitType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const SplitType = model<ISplitType>('SplitType', splitTypeSchema);

export default SplitType;
