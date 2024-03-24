const mongoose=require('mongoose')
const configDb=async()=>{
    try{
        const db=mongoose.connect('mongodb://127.0.0.1:27017/catalogApp')
        console.log('connected to db succesfull')
    }catch(err){
        console.log(err)
    }
   
}
module.exports=configDb