import { useState } from "react"
import axios from 'axios'
import {useNavigate }from 'react-router-dom'
export default function RegisterForm(){
  const navigate=useNavigate()
    const[userName,setUserName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const handleSubmit= async (e)=>{
        e.preventDefault()
        const formData={
            email:email,
            password:password,
            username:userName
        }
        try{
            const response=await axios.post('http://localhost:3044/api/users/register',formData)
            console.log(response.tokoen)
        }catch(err){
            console.log(err)
        }
       navigate("/")
    }
    return (
      <div className="container mt-20">
        <body class="text-center">
    
<main class="form-signin">
  <form onSubmit={handleSubmit}>
   <div className="row g-3 align-items-center">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
       value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="username"
         value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
      <label for="floatingInput">UserName</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingPassword" placeholder="Password"
      value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <label for="floatingPassword">Password</label>
    </div>

    
    <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
    
    </div>
  </form>
</main>


    
  

</body>
</div>
    )
}