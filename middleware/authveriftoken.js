const jwt = require("jsonwebtoken");
const User = require('../models/userModel');


const authverifytoken=async (req,res,next)=>{
  try{
      let token=req.headers['accesstoken'] || req.headers['authorization'];
      
      if(!token)
        return res.status(409).json({sucess:false,msg:"Please login or signup before proceeding"});
      else{
        token = token.replace(/^Bearer\s+/, "");
        const verify= jwt.verify(token,process.env.jwtsecretkey1,async (err,payload)=>{
          if(err){
            return res.status(409).json({sucess:false,msg:"Invalid or Expired Token"});  
          }
          const {user_name}=payload;
          const user = await User.findOne({
            where:{
              user_name
            }
          });
          if(!user) return res.status(404).json({status:false,msg:"Failed to find user from token."});
          req.user=user;
          next();
        });
      }
    } catch(err){
        return res.status(409).json({success:false,msg: err.message });
    }
  }
  module.exports={
    authverifytoken
  }