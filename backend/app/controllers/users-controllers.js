const Users=require('../models/users-model')
const jwt =require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const {validationResult}=require('express-validator')
const usersCntrl={}
usersCntrl.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    const body=req.body
    const user=new Users(body)
    try{
        const salt= await bcryptjs.genSalt()
        const encryptedpassword= await bcryptjs.hash(user.password,salt)
        user.password=encryptedpassword
        const count= await Users.countDocuments()
        console.log(count)
        if(count ==0){
         user.role='admin'
        }else{
            user.role='customer'
        }
        await user.save()
        res.status(201).json(user)
    }catch(err){
        res.status(401).json({error:"intrnal server error"})
    }
}
usersCntrl.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const user=await Users.findOne({email:body.email})
        if(!user){
           return res.status(402).json({error:"email  is wrong"})
        }
        const checkPassword=await bcryptjs.compare(body.password,user.password)
        if(!checkPassword){
            return res.status(401).json({error:" password is wrong"})
        }
        const tokenData={
            id:user._id,
            role:user.role
        }
        const token=await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"11d"})
        res.status(201).json({token:token})

    }catch(err){
        res.status(401).json({error:"internal server error"})
    }
}
usersCntrl.account=async(req,res)=>{
    try{
         const user=await Users.findById(req.user.id)
         res.status(201).json(user)
    }catch(err){
        res.status(401).json({error:"internal server error"})
    }
}
module.exports=usersCntrl