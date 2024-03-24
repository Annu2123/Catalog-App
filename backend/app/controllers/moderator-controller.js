const { validationResult } = require('express-validator')
const bcryptjs=require('bcryptjs')
const Moderator=require('../models/moderator-model')
const jwt=require('jsonwebtoken')
const moderatorCntrl={}
moderatorCntrl.createModerator=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
      const body=req.body
      const moderator=Moderator(body)
      
      try{
        const salt=await bcryptjs.genSalt()
        const encryptedpassword=await bcryptjs.hash(moderator.password,salt)
        moderator.password=encryptedpassword
        await moderator.save()
        res.status(201).json(moderator)
      }catch(err){
        res.status(401).json({error:"internal server error"})
      }
}
moderatorCntrl.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    const body=req.body
    try{
       
        const user=await Moderator.findOne({email:body.email})
        if(!user){
            res.status(402).json({error:"email or password is wrong"})
        }
       
        const checkPassword=await bcryptjs.compare(body.password,user.password)
        if(!checkPassword){
            res.status(401).json({error:"email or password is wrong"})
        }
       
        const tokenData={
            id:user._id,
            role:user.role
        }
        const token=await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"11d"})
        res.status(201).json({token:token})
   consol
    }catch(err){
        res.status(401).json({error:"internal server error"})
    }
}
moderatorCntrl.account=async(req,res)=>{
    try{
        const user=await Moderator.findById(req.user.id)
        res.status(201).json(user)
    }catch(err){
        res.status(401).json({error:"internal server error"})
    }
}
module.exports=moderatorCntrl