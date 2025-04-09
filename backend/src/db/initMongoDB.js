import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URL } = process.env;

export const initMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
