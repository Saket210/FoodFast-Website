import express from "express"
import foodItemRouter from "./foodItemRoute.js";
import userRouter from "./userRoute.js";
import userCartRouter from "./userCartRoute.js";
import orderRouter from "./orderRoute.js";

const appRouter = express.Router();

appRouter.use("/food", foodItemRouter);
appRouter.use("/user", userRouter)
appRouter.use("/cart",userCartRouter);
appRouter.use("/order", orderRouter);

export default appRouter;