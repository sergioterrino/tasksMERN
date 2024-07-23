import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    .then(() => console.log('tasksMERNdb connected :)'))
    .catch((error) => console.log(error.message));
  } catch (error) {
    console.log(error.message);
  }
}