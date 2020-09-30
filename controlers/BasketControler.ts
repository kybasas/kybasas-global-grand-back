import { IProduct } from "./../models/Product";
import { IBasket } from "./../models/Basket";
import express from "express";
import BasketModel from "../models/Basket";
import ProductModel from "../models/Product";

class BasketControler {
  constructor() {}

  addBasket = (req: express.Request, res: express.Response) => {
    const { idProduct, idBasket } = req.body;
    const userId = req.user;
    ProductModel.findOne({ _id: idProduct }, (err, product: IProduct) => {
      if (err || !product) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      BasketModel.findOneAndUpdate(
        { _id: idBasket, user: userId },
        { $push: { products: product } }
      )
        .then((basket: IBasket | null) => {
          basket
            ? res.json({ message: `Продукт добавлен` })
            : res.status(404).json({ message: "Корзина не найдена" });
        })
        .catch((err: any) => {
          res.json({ message: err });
        });
    }).catch((err: any) => {
      res.json({ message: err });
    });
  };
}

export default BasketControler;
