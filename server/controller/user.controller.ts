import { Request, Response } from 'express';
import { User } from '../models/user.model';

import cloudinary from '../utils/cloudinary';

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } =
      req.body;

    // upload image on cloudinary
    let cloudRespone: any;
    cloudRespone = await cloudinary.uploader.upload(profilePicture);

    const updatedData = {
      fullname,
      email,
      address,
      city,
      country,
      profilePicture,
    };

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select('-password');

    return res.status(200).json({
      success: true,
      user,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
