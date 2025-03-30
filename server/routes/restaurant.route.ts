import express from 'express';
import {
  createRestaurant,
  getSelectedRestaurant,
  getUserRestaurant,
  searchRestaurant,
  updateRestaurant,
} from '../controller/restaurant.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';
import upload from '../middleware/multer';

const router = express.Router();

router
  .route('/')
  .post(isAuthenticated, upload.single('imageFile'), createRestaurant);

router.route('/').get(isAuthenticated, getUserRestaurant);

router
  .route('/')
  .put(isAuthenticated, upload.single('imageFile'), updateRestaurant);

router.route('/search/:searchText').get(isAuthenticated, searchRestaurant);

router.route('/:resturantId').get(isAuthenticated, getSelectedRestaurant);

export default router;
