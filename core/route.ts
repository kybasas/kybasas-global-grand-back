// import { validationResult } from 'express-validator';
import bodyParser from "body-parser";
import express from "express";
import validationRegister from "../utils/validation/registration";
import validationLogin from "../utils/validation/login";
import UserControler from "../controlers/UserController";
import ProductControler from "../controlers/ProductControler"
import BasketControler from "../controlers/BasketControler"
import { checkAuth } from "../middlewares/checkAuth";
import cors from "cors";
// import UserModel, { IUser } from "../models/User";

const createRoutes = (app: express.Express) => {
  const UserControls = new UserControler();
  const ProductControls = new ProductControler()
  const BasketControls = new BasketControler()
  console.log(ProductControls);
  

  app.use(cors());
  app.use(checkAuth);
  app.use(bodyParser.json());

  // app.get("/", (_: express.Request, res: express.Response) => {

  //     res.send("Hello, World!");
  // });
  app.get("/user/me", UserControls.getMe);
  app.post("/user/signup", validationRegister, UserControls.create);
  app.post("/user/signin", validationLogin, UserControls.login);
  app.delete("/user/delete/:id", UserControls.delete);
  app.get("/user/find", UserControls.findUsers);


  app.post("/product", ProductControls.createProduct)
  app.delete("/product", ProductControls.delete)
  app.get('/product', ProductControls.findProducts)
  app.get('/product/findSex', ProductControls.findProductSex)

  app.post('/basket',BasketControls.addBasket)
  /*app.delete("/messages", MessageControls.delete);*/
};

export default createRoutes;
