import User from "../models/user.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async(req , res , next) => {
    let users;
    try {
        users = User.find();
    }
    catch (err) {
        return console.log(err);
    }

    if(!users){
        return res.status(500).send('ok');
    }
    const usersData = await users.lean();
    return res.status(200).json({"userList":usersData})
}



export const signUp =  async(req ,res , next ) => {

    const {name , email , password} = req.body;

    if(!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() ==="")
    return res.status(422).json({message: "Invalid Input"})

    const hashedPassword = bcrypt.hashSync(password);
    let newUser ;
    try{
        newUser =  new User( {name , email  ,password: hashedPassword});
        newUser =  await newUser.save();

    }
    catch (error) {
        return console.log(error)
    }
    if(!newUser){
        return res.status(500).json({message:"Unexpected Error Occured"})
    }
    return res.status(201).json({newUser})

}

export const updateUser = async (req , res ,next ) => {
    const userId = req.params.id;
    const {name , email , password} = req.body;
    console.log(userId , 'id');
    if(!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() ==="")
    return res.status(422).json({message: "Invalid Input"});
    let user;
    const hashedPassword = bcrypt.hashSync(password);
    try{
        user  = await User.findByIdAndUpdate(userId ,{
            name,
            email,
            password : hashedPassword
        });

    }
    catch (err){ 
        console.log(err);
    }
    if(!user){
      return  res.status(500).json({message:"Some Error Occured"})
    }
    const usersList = User.find();
    const userData = await usersList.lean();
    return res.status(200).json({updatedList:userData ,message:"uPDATED sUCCESS"})

}

export const deleteUser = async(req , res, next) =>{
    const userId = req.params.id;
    console.log(userId)
    let userDeleted;
    try{
    userDeleted =  User.findByIdAndDelete(userId);
    }
    catch(err){
        console.log(err,'error find')
    }
    if(!userDeleted){
        return res.status(500).json({message:"Something went wrong"})
    }
    const user = await userDeleted.lean();
    return res.status(200).send({message:"deleted Successfully" ,RemovedUser : user})
}

export const login =  async (req , res, next) => {
    const {email , password} = req.body;
    
    if(!email && email.trim() === "" && !password && password.trim() ==="")
    return res.status(422).json({message: "Invalid Input"})
    let userLoggedIn;
    try{
      userLoggedIn  = await User.findOne({email});
    }
    catch(err){
        console.log(err,'error coming')
    }

    if(!userLoggedIn){
        res.status(500).json({message:"No User with this email Id"})
    }
    console.log(userLoggedIn , 'user');
    console.log(userLoggedIn.password , 'password')
    console.log(password,'pass')
    
    const isPasswordCorrect = bcrypt.compareSync(password , userLoggedIn.password )
    console.log(isPasswordCorrect,'check');
    if(!isPasswordCorrect){
    return res.status(500).json({message:"Incorrect Email or Password"});
    }
    return res.status(200).json({message:"LoggedIn Successfully" , userLoggedIn})
  
}