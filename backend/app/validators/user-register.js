
const Users = require('../models/users-model')

const usersRegisterValidation={
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
                options: async function(value){
                    const user=await Users.findOne({email:value})
                    if(!user){
                          return true
                    }else{
                        throw new Error("email is already exist")
                    }
                    
                }
            }

        },
        password:{
            notEmpty:{
                errorMessage:"password is require"
            },
            isLength:{
                options:{min:8,max:20},
                errorMessage:"password length should be 8 to 20 charactor"
            }
        }
    }
    const usersLoginSchema={
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

module.exports={usersRegisterValidation,usersLoginSchema}