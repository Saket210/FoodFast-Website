import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.user.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    const orderDetails = await newOrder.save();

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/allorders`,
      cancel_url: `${process.env.FRONTEND_URL}/allorders`,
      client_reference_id: orderDetails._id.toString(),
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Order Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const paymentHandler = async (req, res) => {
  try {

    const sig = req.headers['stripe-signature'];

    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_CHECKOUT_VERIFY_KEY);

    if(event.type !== "checkout.session.completed") {
         return res.json({ success: false})
    }
    const eventData = event.data.object;
    const checkoutStatus = eventData.status;
    const orderId = eventData.client_reference_id;
    const order = await orderModel.findById({
      _id: new mongoose.Types.ObjectId(orderId),
    });

    if (checkoutStatus == "expired") {
      await orderModel.findByIdAndUpdate(orderId, {
        status: "Discarded",
        payment: "Expired",
      });
    } else if (eventData.payment_status == "paid") {
      await orderModel.findByIdAndUpdate(orderId, {
        status: "Out for Delivery",
        payment: "Completed",
      });
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, userOrders, allOrders, updateStatus, paymentHandler };
