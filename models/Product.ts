import { IUploadFile } from "./UploadFile";
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  priceStandart: number;
  priceNew: number;
  data?: IProduct;
  _id: string;
  typeProduct: string;
  photo: string | IUploadFile;
  price: number
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    typeProduct: {
      type: String,
      require: true,
    },
    sex: {
      type: String,
      require: true,
    },
    priceStandart: {
      type: Number,
      require: true,
    },
    priceNew: {
      type: Number,
    },
    price: {
      type: Number,
      require: true,
    },
    photo: {
      type: Schema.Types.ObjectId,
      ref: "UploadFile",
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
