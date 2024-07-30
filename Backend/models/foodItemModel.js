import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required:true}
})

const foodItemModel = mongoose.models.foodItem || mongoose.model("foodItem", FoodItemSchema)
export default foodItemModel