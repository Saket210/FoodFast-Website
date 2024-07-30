import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { allOrders, paymentHandler, placeOrder,updateStatus,userOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.get("/user",authMiddleware,userOrders);
orderRouter.get("/",allOrders);
orderRouter.post("/update",updateStatus);
orderRouter.post("/payment/webhook",paymentHandler)

export default orderRouter;