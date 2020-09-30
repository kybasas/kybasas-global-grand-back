import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./Product";

export interface IBasket extends Document {
  data?: IBasket;
  _id: string;
  user: string | IProduct;
  products: Array<IProduct> | [];
}

const BasketSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const BasketModel = mongoose.model<IBasket>("Basket", BasketSchema);

export default BasketModel;
