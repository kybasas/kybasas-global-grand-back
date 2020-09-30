import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  data?: IProduct;
  _id: string;
  typeProduct: string;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    typeProduct: {
      type: String,
    },
    sex: {
      type: String,
    },
    price: {
      type: Number,
    },
    reating: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
