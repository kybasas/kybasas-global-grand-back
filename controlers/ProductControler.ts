import { namesProduct, namesSex } from "./../constants";
import express from "express";
import ProductModel, { IProduct } from "../models/Product";

class ProductControler {
  constructor() {}

  findProductSex = (req: express.Request, res: express.Response) => {
    const query: string =
      req.query && req.query.query ? (req.query as any).query : "";
    if (namesSex.includes(query)) {
      ProductModel.find()
      .or([{ sex: query}])
      .then((users: IProduct[]) => res.json(users))
      .catch((err: any) => {
        return res.status(404).json({
          status: "error",
          message: err,
        });
      });
    } else {
      res.status(404).json({message: 'Передайте правильный пол'})
    }
    
  };

  findProducts = (req: express.Request, res: express.Response): void => {
    const query: string =
      req.query && req.query.query ? (req.query as any).query : "";

    ProductModel.find()
      .or([{ name: new RegExp(query, "i") }])
      .then((users: IProduct[]) => res.json(users))
      .catch((err: any) => {
        return res.status(404).json({
          status: "error",
          message: err,
        });
      });
  };
  delete = (req: express.Request, res: express.Response) => {
    const id: any = req.query && req.query.id;

    ProductModel.findOneAndRemove({ _id: id })
      .then((product: IProduct | null) => {
        product
          ? res.json({ message: `Product ${product.name} deleted` })
          : res.status(404).json({ message: "Продукт не найден" });
      })
      .catch((err: any) => {
        res.json({ message: err });
      });

    // const id: string = req.params.id;
  };
  createProduct = async (req: express.Request, res: express.Response) => {
    const { name, price, typeProduct, sex } = req.body;

    const priceFixed = Number(price);

    if (
      name &&
      !isNaN(priceFixed) &&
      namesProduct.includes(typeProduct) &&
      namesSex.includes(sex)
    ) {
      const product = new ProductModel({
        name,
        price: priceFixed.toFixed(),
        typeProduct,
        sex,
      });

      product
        .save()
        .then((reason: IProduct) => {
          res.json(reason);
        })
        .catch((reason) => {
          res.json(reason);
        });
    } else {
      res.json({ message: "Передайте все параметры и проврете правильность" });
    }
  };
}

export default ProductControler;
