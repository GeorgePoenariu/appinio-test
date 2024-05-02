import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connectionUri = `${process.env.MONGO_URI_PREFIX}://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;

    await mongoose.connect(connectionUri, {
      dbName: process.env.MONGO_DATABASE,
    });
    console.log('MongoDB connection established');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
