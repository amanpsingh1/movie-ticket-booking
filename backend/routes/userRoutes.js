import express from "express";
import { deleteUser, getAllUsers, login, signUp, updateUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/" , getAllUsers);
userRouter.post("/signUp" ,signUp);
userRouter.put("/update/:id" ,updateUser)
userRouter.delete("/delete/:id" , deleteUser);
userRouter.post("/login" , login)

export default userRouter;