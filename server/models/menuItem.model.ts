import mongoose from 'mongoose';

export interface IMenuItem {
  //   _id:mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface IMenuItemDocument extends IMenuItem, Document {
  createdAt: Date;
  updatedAt: string;
}

const menuItemSchema = new mongoose.Schema<IMenuItemDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    price: { type: Number, required: true },
    image: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
