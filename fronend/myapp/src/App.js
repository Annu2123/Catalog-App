// import './App.css';
import { useEffect, useState } from 'react';
import {DataContextApi} from './store/datacontext'
import Header from './component/header';
import axios from 'axios'
// import RegisterForm from './component/registerForm';
import {Outlet} from "react-router-dom"
import ProductLIst from './component/porductList';
function App() {
  const [products,setProducts]=useState([])
  console.log(products,"prod")
  const addProduct=(result)=>{
    setProducts([...products,result])
  }
  useEffect(()=>{
    (async()=>{
      try{
        const response=await axios.get('http://localhost:3044/api/product')
        console.log("data",response.data)
        setProducts(response.data)
      }catch(err){
        console.log(err)
      }

    })()
  },[])
  return (
    <DataContextApi.Provider value={
     {products:products,addProduct:addProduct}
    
    } >
       <div className="App">
      <Header/>
      <Outlet></Outlet>

    
    </div>
    </DataContextApi.Provider>
   
  );
}

export default App;
