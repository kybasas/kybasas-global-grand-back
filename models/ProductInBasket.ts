import { IUploadFile } from "./UploadFile";
import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./Product";

export interface IProductInBasket extends Document {
  name: string;
  priceStandart: number;
  priceNew: number;
  data?: IProductInBasket;
  _id: string;
  typeProduct: string;
  photo: string | IUploadFile;
  product: IProduct
}

const ProductInBasketSchema: Schema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    basket: {
      type: Schema.Types.ObjectId,
      ref: "Basket",
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

const ProductInBasketModel = mongoose.model<IProductInBasket>("ProductInBasket", ProductInBasketSchema);

export default ProductInBasketModel;
