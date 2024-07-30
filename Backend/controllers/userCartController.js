import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.user.id });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.user.id, { cartData });
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message:"Error"});
  }
};

const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.user.id);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.user.id,{cartData});
        res.json({ success: true, message:"Item removed from cart"});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message:"Error"});
    }
};

const getCartItems = async (req,res) => {
    try {
        let userData = await userModel.findById(req.user.id);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message:"Error"});
    }
};

export { addToCart, removeFromCart, getCartItems };
