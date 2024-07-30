import express from "express"
import { addFoodItem, listFoodItems, removeFoodItem } from "../controllers/foodItemController.js"
import multer from "multer"

const foodItemRouter = express.Router();


const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}_${file.originalname}`)
    },
})

const upload =multer ({storage:storage})

foodItemRouter.post("/add", upload.single("image"),addFoodItem)
foodItemRouter.get("/list", listFoodItems)
foodItemRouter.post("/remove", removeFoodItem)

export default foodItemRouter