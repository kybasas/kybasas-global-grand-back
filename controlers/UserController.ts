import { IBasket } from './../models/Basket';
import { createJWToken } from "./../utils/createJWToken";
import { IUser } from "./../models/User";
import express from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User";
import BasketModel from "../models/Basket"

class UserControler {

  constructor() {}

  getMe = (req: express.Request, res: express.Response) => {

    const id: string | undefined = req.user && req.user;

    UserModel.findById(id, (err: any, user: IUser) => {
      if (err || !user) {
        return res.status(404).json({
          message: "Not found",
        });
      }
      res.json(user);
    });
  };


  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;

    UserModel.findOneAndRemove({ _id: id })
      .then((user: IUser | null) => {
        user
          ? res.json({ message: `User ${user.email} deleted` })
          : res.status(404).json({ message: "Пользователь не найден" });
      })
      .catch((err: any) => {
        res.json({ message: err });
      });

    // const id: string = req.params.id;
  };


  create = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ message: "Такаой Пользователь уже создан" });
    } else if (errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new UserModel({ email, password: hashedPassword });
      const basket = new BasketModel({ user: user._id })
      user.save();
      basket.save()

      res.json({ message: "Пользователь создан" });
    }
  };


  findUsers = (req: express.Request, res: express.Response): void => {
    const query: string =
      req.query && req.query.query ? (req.query as any).query : "";

    UserModel.find()
      .or([
        { fullname: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ])
      .then((users: IUser[]) => res.json(users))
      .catch((err: any) => {
        return res.status(404).json({
          status: "error",
          message: err,
        });
      });
  };


  login = (req: express.Request, res: express.Response): void => {
    const postData: { email: string; password: string } = {
      email: req.body.email,
      password: req.body.password,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      UserModel.findOne({ email: postData.email }, (err: any, user: IUser) => {
        if (err || !user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
      
        BasketModel.findOne({ user: user._id }, (err: any, basket: IBasket) => {     
          if (err || !basket) {
            return res.status(404).json({
              message: "Basket not found",
            });
          }

          if (bcrypt.compareSync(postData.password, user.password)) {
            const token = createJWToken(user.id);
            res.json({
              status: "success",
              _id: user.id,
              token,
              basket
            });
          } else {
            res.status(403).json({
              status: "error",
              message: "Incorrect password or email",
            });
          }
        })
      })
      
    }
  }
}

export default UserControler;
