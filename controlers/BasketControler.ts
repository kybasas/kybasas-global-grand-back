import { IProductInBasket } from "./../models/ProductInBasket";
import express from "express";
import BasketModel from "../models/Basket";
import ProductModel from "../models/Product";
import ProductInBasketModel from "../models/ProductInBasket";

class BasketControler {
  constructor() {}

  addBasketProduct = async (req: express.Request, res: express.Response) => {
    const { idProduct } = req.body;
    const userId = req.user;

    const product = await ProductModel.findOne({ _id: idProduct });
    const basket = await BasketModel.findOne({ user: userId });

    if (product && basket) {
      const productInBasket = new ProductInBasketModel({
        product: product._id,
        basket: basket._id,
        user: userId,
      });

      BasketModel.update(
        { user: userId },
        { $inc: { count: 1, finalPrice: product.price } },
        { new: true },
        function (err) {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: err,
            });
          }
        }
      );

      productInBasket.save().then((productInBasket: IProductInBasket) => {
        res.json(productInBasket);
      });
    } else {
      res.status(404).json({ message: "Ничего не найдено" });
    }
  };

  deleteBasketProduct = async (req: express.Request, res: express.Response) => {
    const { idProduct } = req.body;
    const userId = req.user;

    const basket = await BasketModel.findOne({ user: userId });
    // const product = await ProductModel.findOne({ _id: idProduct });

    if (basket) {
      let a = await ProductInBasketModel.findOneAndRemove({ _id: idProduct });
      a?.populate('product',
      (err: any, productInBasket: IProductInBasket) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: err,
          });
        }

        BasketModel.update(
          { user: userId },
          { $inc: { count: -1, finalPrice: -1 * productInBasket.product.price } },
          { new: true },
          function (err) {
            if (err) {
              return res.status(500).json({
                status: "error",
                message: err,
              });
            }
          }
        );
        

        res.json(productInBasket);
      })
    } else {
      res.status(404).json({ message: "Ничего не найдено" });
    }
  };
}

export default BasketControler;
