
import jwt from "jsonwebtoken"
import config from "../config.js"
function userMiddleware(req,res,next){
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({errors:"No token provided"})  
    }
    const token=authHeader.split(" ")[1]
    try{
const decoded=jwt.verify(token,config.JWT_USER_PASSWORD)
console.log(decoded)
req.userId=decoded.id

next();//next function vapis sa control sendPrompt function ma bhej dega from userMiddleware function 
    }catch(error){
return res.status(401).json({errors:"Invalid token or expired"})
    }

}
export default userMiddleware;