import { useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Login(){
    const navigate=useNavigate()
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData={
            email,
            password
        }
        console.log('login',formData)
     try{
        const response=await axios.post('http://localhost:3044/api/users/login',formData)
        console.log(response.data.token)
        const token=response.data.token
        localStorage.setItem('token',token)
     }catch(err){
        console.log(err)
     }
     navigate("/")
    }
    return(
        <div  className="container row">
            <h1>login</h1><br/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter your email</label>
                <input type="text" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br/>
                <label htmlFor="password">enter password</label>
                <input type="text"  id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit">login</button>
            </form>
        </div>
    )
}