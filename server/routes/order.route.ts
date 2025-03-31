import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import {
  getRestaurantOrders,
  updateOrderStatus,
} from '../controller/order.controller';

const router = express.Router();

router.route('/restaurant/orders').get(isAuthenticated, getRestaurantOrders);

router.route('/:orderId/status').put(isAuthenticated, updateOrderStatus);

export default router;
