import mongoose from "mongoose";

interface ISummarization extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  article: string;
  summary: string;
  insights: string[];
}
const summarizationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  article: String,
  summary: String,
  insights: [String],
});

export const Summarization = mongoose.model<ISummarization>(
  "Summarization",
  summarizationSchema
);
