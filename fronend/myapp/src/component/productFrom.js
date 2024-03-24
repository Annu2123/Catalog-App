import { useState ,useContext } from "react"
import axios from 'axios'
import {DataContextApi} from '../store/datacontext'
import {useNavigate} from 'react-router-dom'
export default function AddProduct(){
    const navigate=useNavigate()
    const[name,setName]=useState('')
    const[description,setDescription]=useState('')
    const[price,setPrice]=useState()
    const[image,setImage]=useState()
    const{ addProduct}=useContext(DataContextApi)
    const handleSubmit= async(e)=>{
        e.preventDefault()
        const formData={
            name:name,
            price:price,
            description:description,
            image:image
        }
           
            console.log(formData)

            try{
                const response= await axios.post('http://localhost:3044/api/product',formData,{
                    headers:{
                        Authorization:localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
             
                addProduct(response.data)
            }catch(err){
                console.log(err)
            }
            navigate("/")
        }
        // console.log(formData)
    
    return (
        <div>
            <h2>Add Product </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Enter product name</label>
                <input type="text" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/><br/>
                <label htmlFor="price">entr price</label>
                <input type="number" id="price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/><br/>
                <label>Enter description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea><br/>
                <label htmlFor="img">select image</label>
                <input type="file" id="img" onChange={(e)=>{setImage(e.target.files[0])}}/><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}