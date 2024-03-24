const {Schema,model}=require('mongoose')
const usersRegisterSchema=new Schema({
    username:String,
    email:String,
    password:String,
    role:String
})
const Users=model('User',usersRegisterSchema)
module.exports=Users