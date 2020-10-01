import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./Product";

export interface IBasket extends Document {
  data?: IBasket;
  user: string | IProduct;
  count: number;
  finalPrice: number;
}

const BasketSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    count: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const BasketModel = mongoose.model<IBasket>("Basket", BasketSchema);

export default BasketModel;
