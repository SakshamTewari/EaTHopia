import { Request, Response } from 'express';
import { Restaurant } from '../models/restaurant.model';
import { Order } from '../models/order.model';
import { Multer } from 'multer';
import uploadImageOnCloudinary from '../utils/imageUpload';

/* Create Restaurant */
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

/* Get User's Restaurant */
export const getUserRestaurant = async (req: Request, res: Response) => {
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
    const restaurant = await Restaurant.findOne({ user: req.id });

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

/* Search Restaurants */
export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const searchText = req.params.searchText || '';
    const searchQuery = (req.query.searchQuery as string) || '';
    const selectedCuisines = ((req.query.selectedCuisines as string) || '')
      .split('.')
      .filter((cuisine) => cuisine); // ['momos', 'burger']

    const query: any = {};

    // search based on searchText (name, city, country)
    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: 'i' } },
        { city: { $regex: searchText, $options: 'i' } },
        { country: { $regex: searchText, options: 'i' } },
      ];
    }

    // filter based on searchQuery
    if (searchQuery) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: 'i' } },
        { cuisines: { $regex: searchQuery, $options: 'i' } },
      ];
    }
    // console.log(query);

    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }

    const restaurants = await Restaurant.find(query);

    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

/* Get Selected Restaurant */
export const getSelectedRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: 'menuItems',
      options: { createdAt: -1 },
    });

    if (!restaurant) {
      return res.status(404).json({
        message: 'Restaurant not found',
      });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
