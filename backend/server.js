require('dotenv').config()
const express=require('express')
const {checkSchema}=require ('express-validator')
const multer  = require('multer')


const {usersRegisterValidation,usersLoginSchema}=require('./app/validators/user-register')
const usersCntrl=require('./app/controllers/users-controllers')
const {authenticateUser ,authorize}=require('./app/middlewares/auth')
const moderatorCntrl=require('./app/controllers/moderator-controller')
const {moderatorValidation,moderatorLogin}=require('./app/validators/moderator-validation')
const productCntrl=require('./app/controllers/product-controllers')
const productValidation=require('./app/validators/product-validation')
const app=express()
app.use('/uploads',express.static('uploads'))
const cors=require('cors')
app.use(cors())
app.use(express.json())
const port=3044

const configDb=require('./config/db')
configDb()

const storage=multer.diskStorage(
    {
        destination:function (req,file,cb){
            return cb(null,"./uploads")
        },
        filename:function(req,file,cb){
            return cb(null,`${Date.now()}-${file.originalname}`)
        }
    }
)
const upload=multer({storage})
app.post('/api/users/register',checkSchema(usersRegisterValidation),usersCntrl.register)
app.post('/api/users/login',checkSchema(usersLoginSchema),usersCntrl.login)
app.get('/api/account',authenticateUser,usersCntrl.account)
app.post('/api/create/moderator',authenticateUser,authorize(['admin']),checkSchema(moderatorValidation),moderatorCntrl.createModerator)
app.post('/api/moderator/login',checkSchema(moderatorLogin),moderatorCntrl.login)
app.get('/api/moderator/account',authenticateUser,moderatorCntrl.account)
app.post('/api/product',authenticateUser,authorize(["moderator","admin"]),checkSchema(productValidation),upload.single('image'),productCntrl.create)
app.put('/api/product/approve/:id',authenticateUser,authorize(['admin']),productCntrl.approve)
app.get('/api/product',productCntrl.list)
app.get('/api/product/my',authenticateUser,authorize(['moderator']),productCntrl.myProduct)
app.put('/api/product/soft/:id',authenticateUser,authorize(['moderator']),productCntrl.softDelete)
app.put('/api/product/restore/:id',authenticateUser,authorize(['admin']),productCntrl.restore)
app.delete('/api/product/:id',authenticateUser,authorize(['admin']),productCntrl.remove)
app.listen(port,()=>{
    console.log('server is running in port no '+port)
})