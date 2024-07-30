import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js"
import routes from './routes/index.js';
import 'dotenv/config'
import { raw } from "express";

const app = express()

//middlewares
app.use('/api/order/payment/webhook',raw({type:'*/*'}))
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
}
))

// conect db
connectDb();

//api endpoints
app.use("/api",routes)
app.use("/images",express.static('uploads'))


app.get("/", (req, res)=> {
    res.send("API Working")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running at port ${process.env.PORT}`)
})
