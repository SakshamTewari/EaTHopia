import mongoose from 'mongoose';

export interface IRestaurant {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menuItems: mongoose.Schema.Types.ObjectId[];
}

export interface IRestaurantDocument extends IRestaurant, Document {
  createdAt: Date;
  updatedAt: string;
}

const restaurantSchema = new mongoose.Schema<IRestaurantDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required:true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deliveryTime: { type: Number, required: true },
    cuisines: [{ type: String, required: true }],
    imageUrl: {
      type: String,
      required: true,
    },
    menuItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
