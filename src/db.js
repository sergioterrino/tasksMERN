import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/tasksMERNdb');
    console.log('tasksMERNdb connected :)');
  } catch (error) {
    console.log(error.message);
  }
}