const {Schema,model}=require('mongoose')
const moderatorRegisterShcema=new Schema({
    username:String,
    email:String,
    password:String,
    role:String  
 })
 const Moderator=model('Moderator',moderatorRegisterShcema)
 module.exports=Moderator