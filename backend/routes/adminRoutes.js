import express  from "express";
import { addAdmin, adminLogin } from "../controllers/adminController.js";
const adminRouter = express.Router();

adminRouter.post('/signUp' ,addAdmin )
adminRouter.post('/login' , adminLogin)
// adminRouter.post('/login',)
export default adminRouter;