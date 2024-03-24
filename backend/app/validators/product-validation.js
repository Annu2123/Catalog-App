const productValidation={
    name:{
        in:['form-data'],
        notEmpty:{
            errorMessage:"name is require"
        },
    },
    price:{
        in:['form-data'],
        notEmpty:{
            errorMessage:"price is required"
        } 
    },
    description:{
        in:['form-data'],
        notEmpty:{
            errorMessage:"description is required"
        }
    },
    image:{
        in:['form-data'],
        notEmpty:{
            errorMessage:"image is required"
        }
    },
    
}
module.exports=productValidation