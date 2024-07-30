import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")?.[1];
  if (!token) {
    return res.json({ success: false, message: "Not logged in, login again" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: tokenDecode.id };
    const findUser = await userModel.findById(req.user.id);
    if(!findUser) {
      return res.json({ success: false, message : "Invalid User" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
