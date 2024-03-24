 const Moderator=require('../models/moderator-model')
 const moderatorValidation={
    username:{
        notEmpty:{
            errorMessage:"username is require"
        }
    },
    email:{
        notEmpty:{
            errorMessage:"email is require"
        },
        trim:true,
        custom:{
            options:async function(value){
                const user=await Moderator.findOne({email:value}) 
                if(!user){
                    return true
                }else{
                    throw new Error('email already exist in db')
                }
            }
        }
    },
   password:{
    notEmpty:{
        errorMessage:"password is required"
    },
    isLength:{
        options:{min:8,max:20},
        errorMessage:"password length should be between 8 to 20"
    }
   },
   role:{
    notEmpty:{
        errorMessage:"role is required"
    }
   }
}
const moderatorLogin={
    email:{
        notEmpty:{
            errorMessage:"email is require"
        },
        trim:true,
        isEmail:{
            errorMessage:"emial should be a valide email"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"password is required"
        },
        isLength:{
            options:{min:8,max:20},
            errorMessage:"password must be contain 8 char and 20 char long"
        }
    }
}

module.exports={moderatorLogin,moderatorValidation}
