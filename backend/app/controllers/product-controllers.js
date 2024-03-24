const { validationResult } = require("express-validator")
const Product = require("../models/product-model")

const productCntrl={}
productCntrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
         return res.status(401).json({errors:errors.array()})
    }
    const body=req.body
    const image=req.file
    const product=new Product(body)
    product.image=image.filename
    product.approvalStatus=false
    product.moderatorId=req.user.id
    try{
        await product.save()
        res.status(201).json(product)
    }catch(err){
        res.status(401).json({errors:"internal server error"})
    }
}
productCntrl.approve=async(req,res)=>{
    const id=req.params.id
    try{
        const product= await Product.findByIdAndUpdate(id,{$set:{approvalStatus:true}},{new:true})
        res.status(201).json(product)
    }catch(err){
        res.status(401).json({error:"inernal server error"})
    }
}
productCntrl.list=async(req,res)=>{
  try{
        const product= await Product.find({approvalStatus:true,isDeleted:false})
        res.status(201).json(product)
  }catch(err){
    res.status(401).json({error:"internal server error"})
  }
}
productCntrl.myProduct=async(req,res)=>{
   try{
    const product=await Product.find({moderatorId:req.user.id})
    res.status(201).json(product)
   }catch(err){
    res.status(401).json({error:"internal server error"})
   }
}
productCntrl.softDelete=async(req,res)=>{
     const id=req.params.id
     try{
        const product=await Product.findByIdAndUpdate(id,{$set:{isDeleted:true}},{new:true})
        res.status(201).json(product)
     }catch(err){
        res.status(401).json({error:"internal server error"})
     }
}
productCntrl.restore=async(req,res)=>{
    console.log("hiji")
    const id=req.params.id
    try{
        const product=await Product.findByIdAndUpdate(id,{$set:{isDeleted:false}},{new:true})
        res.status(201).json(product)
    }catch(err){
        res.status(401).json({error:"internal server error"})
    }
}
productCntrl.remove=async(req,res)=>{
    const id=req.params.id
    try{
        const product=await Product.findByIdAndDelete(id)
        res.status(201).json(product)
    }catch(err){
        res.status(401).json({error:'internal server error'})
    }
}
module.exports=productCntrl