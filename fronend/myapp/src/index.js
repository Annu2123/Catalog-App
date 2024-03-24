import React from 'react';
import ReactDOM from 'react-dom/client';
 import App from './App';
import {  createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom'
import RegisterForm from './component/registerForm';
import Login from './component/login';
import MyAccount from './component/myAccount';
import AddProduct from './component/productFrom';
import ProductLIst from './component/porductList';
const router=createBrowserRouter([
  {
    path:"/",element:<App/>,
   
    children:[
    // {path:"/",element:</>},
{path:"/register",element:<RegisterForm/>},
{path:"/home",element:<ProductLIst/>},
{path:"/login",element:<Login/> },
{path:"/myaccount",element:<MyAccount/>},
{path:"/productadd",element:<AddProduct/>}
 ],
},
  
])


  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  < RouterProvider router={router}/>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

