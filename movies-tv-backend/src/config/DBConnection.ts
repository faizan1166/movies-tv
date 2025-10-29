import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DBConnection = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;
    console.log(uri,"uri")
    if (!uri) throw new Error('MONGO_URI not set in environment');
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

export default DBConnection;
