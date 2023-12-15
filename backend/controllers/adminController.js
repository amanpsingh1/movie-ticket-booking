import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

export const addAdmin = async (req , res, next) => {
    const { email , password} =  req.body;
    let existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email})
    }   
    catch (err){
        console.log(err , 'error')
    }

    if(existingAdmin){
        res.status(400).json({message:"Admin already exists"})
    }
    let admin;
    const hashedPassword = bcrypt.hashSync(password)
    try{
        admin = new Admin({email , password:hashedPassword})
        admin = await admin.save();
    }
    catch(err){
        console.log(err)
    }
    if(!admin){
        res.status(500).json({message:"Unable to store Admin"})
    }
    else{
        res.status(201).json({message:"Admin successfully created",admin })
    }
} 

export const adminLogin = async (req , res,next) => {
    const{email , password } = req.body;
    if(!email || email.trim() ==="" || !password || password.trim()=== "")
    return res.status(422).json({message:"Invalid Inputs"})
    let existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email})
    }
    catch(err){
        console.log(err);
    }
    if(!existingAdmin){
        res.status(500).json({message:"Admin NOT fOUND"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password , existingAdmin.password)
    if(!isPasswordCorrect){
       res.status(201).json({message:"Incorrect Password"})
    }
    
    const token = jwt.sign({id:existingAdmin._id} , `${process.env.SECRET_KEY}` ,{
        expiresIn: "2h",

    })
     res.status(200).json({message:"Authentication Success" ,token, email:existingAdmin.email})
    

}