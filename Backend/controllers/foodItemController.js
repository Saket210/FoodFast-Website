import foodItemModel from "../models/foodItemModel.js";
import fs from "fs";

const addFoodItem = async (req, res) => {
    let image_filename = `${req.file.filename}`
    const foodItem = new foodItemModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await foodItem.save()
        res.json({success:true,message:"Food Item Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const listFoodItems = async (req, res) => {
    try {
        const foodItems = await foodItemModel.find({})
        res.json({success:true,data:foodItems})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

const removeFoodItem = async (req, res) => {
    try {
        const foodItem = await foodItemModel.findById(req.body.id);
        fs.unlink(`uploads/${foodItem.image}`,()=> {})
        await foodItemModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"FoodItem Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

export {addFoodItem, listFoodItems, removeFoodItem}