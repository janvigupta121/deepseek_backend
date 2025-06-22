
import {User} from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "../config.js"
export const signup = async (req,res) => {
   const {firstName,lastName,email,password} = req.body;

 // Validate fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ errors: "All fields are required" });
  }

try{
const user= await User.findOne({email});
if(user){
    return res.status(400).json({message:"User already exists"});
}

const hashPassword = await bcrypt.hash(password, 10);
const newUser = new User({
    firstName,
    lastName,
    email,
    password:hashPassword,
})
await newUser.save()
return res.status(201).json({message:"User created successfully",user:newUser});
}
catch(error){
console.error("Error in signup:", error);
return res.status(500).json({message:"Internal server error"});
}
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // JWT token
    const token = jwt.sign({ id: user._id }, config.JWT_USER_PASSWORD, {
      expiresIn: "1d",
    });
const cookieOptions={
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"Strict"

}
res.cookie("jwt",token,cookieOptions);

return res.status(200).json({message:"Login successful",user,token});
   }
   catch(error){
console.log("Error in login:", error);
   }
};
//logout function
export const logout = (req,res) => {
try{
res.clearCookie("jwt")
return res.status(200).json({message:"Logout successful"}); 

}catch(error){
console.error("Error in Logout:", error);
return res.status(500).json({message:"error in logout"});
}
};

