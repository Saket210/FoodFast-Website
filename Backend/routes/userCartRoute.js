import express from "express";
import { addToCart,removeFromCart,getCartItems } from "../controllers/userCartController.js";
import authMiddleware from "../middlewares/auth.js"; 

const userCartRouter = express.Router();

userCartRouter.post("/add",authMiddleware,addToCart);
userCartRouter.post("/remove",authMiddleware,removeFromCart);
userCartRouter.get("/get",authMiddleware,getCartItems);

export default userCartRouter;