import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
});

export default cloudinary;
