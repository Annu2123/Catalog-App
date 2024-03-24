const jwt=require('jsonwebtoken')
const authenticateUser= async(req,res,next)=>{
     const token=req.headers['authorization']
     if(!token){
         return res.status(401).json({error:"token is require"})
     }
    try{
        const tokenData=jwt.verify(token,process.env.JWT_SECRET)
        req.user={
            id:tokenData.id,
            role:tokenData.role
        }
        next()
    }catch(err){
        res.status(401).json({error:"token not valid"})
    }

}
const authorize=(userPermitted)=>{
      return (req,res,next)=>{
        if(userPermitted.includes(req.user.role)){
            next()
        }else{
            res.status(404).json({error:"yor not permitted to create moderator"})
        }
      }
}
module.exports={authenticateUser,authorize}