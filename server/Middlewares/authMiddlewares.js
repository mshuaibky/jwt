const User=require('../Models/userModel')
const jwt=require('jsonwebtoken')

module.exports.checkUser=async(req,res,next)=>{
    const token =req.cookies.jwt
   if (token) {
     jwt.verify(token,'shuaib secret key',async(err,decodedToken)=>{
        if(err){
            res.json({status:false})
            next()
        }
     })
   } else {
    const user= await User.findById(decodedToken.id)
    if(user)res.json({status:true,user:user.email})
    else res.json({status:false})
    next()
   }
}