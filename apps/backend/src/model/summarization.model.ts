import mongoose from 'mongoose';

interface ISummarization extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  article: string;
  summary: string;
  insights: string[];
  createdAt: Date;
}
const summarizationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  article: String,
  summary: String,
  insights: [String],
  createdAt: { type: Date, default: Date.now },
});

export const Summarization = mongoose.model<ISummarization>('Summarization', summarizationSchema);
