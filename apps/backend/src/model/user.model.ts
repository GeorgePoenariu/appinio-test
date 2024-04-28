import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

export const User = mongoose.model<IUser>('User', userSchema);
