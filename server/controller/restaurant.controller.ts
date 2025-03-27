import { Request, Response } from 'express';
import { Restaurant } from '../models/restaurant.model';
import { Multer } from 'multer';
import uploadImageOnCloudinary from '../utils/imageUpload';

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;

    const restaurant = await Restaurant.findOne({ user: req.id });

    if (restaurant) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant already exists for this user',
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

    await Restaurant.create({
      user: req.isPaused,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: 'Restaurant added successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/* Get Restaurant */
export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.find({ user: req.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found for this user',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/* Update Restaurant */
export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file; //to get the image;
    const restaurant = await Restaurant.find({ user: req.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found for this user',
      });
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines); // to convert a JSON string into an actual JavaScript object or array.

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File,
      );
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: 'Restaurant updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
