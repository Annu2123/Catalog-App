const {Schema,model}=require('mongoose')
const productSchema=new Schema({
   name:String,
    price:Number,
   description:String,
    image:String,
    moderatorId:Schema.Types.ObjectId,
    isDeleted:{
        type:Boolean,
        default:false
    },
    approvalStatus:Boolean
})
const Product=model('Product',productSchema)
module.exports=Product