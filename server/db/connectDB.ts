//Y6LxE4HcTpuZYpZp //password
// sakshamtewari3 //username

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI!);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
