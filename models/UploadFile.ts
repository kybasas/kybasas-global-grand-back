import { IProduct } from './Product';
import mongoose, { Schema, Document } from "mongoose";



export interface IUploadFile {
  filename: string;
  size: number;
  ext: string;
  url: string;
  product: IProduct | string;
}

export type IUploadFileDocument = Document & IUploadFile;

const UploadFileSchema = new Schema(
  {
    filename: String,
    size: Number,
    ext: String,
    url: String,
    product: { type: Schema.Types.ObjectId, ref: "Product", require: true },
  },
  {
    timestamps: true,
  }
);

const UploadFileModel = mongoose.model<IUploadFileDocument>(
  "UploadFile",
  UploadFileSchema
);

export default UploadFileModel;
