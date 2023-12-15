import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import movieRouter from "./routes/movieRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
// middlewares
app.use("/user" , userRouter)
app.use("/admin" ,adminRouter)
app.use("/movie", movieRouter)


mongoose.connect(`mongodb+srv://aman-user:${process.env.MONGODB_PASSWORD}@cluster0.o8xiid5.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.listen(5000 , () => {
        console.log(`connected at ${5000}`)
    })
})
.catch((e) => console.log(e  , 'error-db'));


