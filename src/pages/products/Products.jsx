import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './Products.module.css'; 
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../../context/user';

function Products() {
 const {setcartNumber,userName ,setNumber ,price,setPraic }=useContext(UserContext);
  const[product,setProduct]=useState([]);

  const getData = async ()=>{
    const urlParams= new URLSearchParams(window.location.search);
const id=urlParams.get('id');  
  const {data}= await axios.get(`https://ecommerce-node4-five.vercel.app/products/category/${id}`);
  setProduct(data.products);
  };
  const addToCart= async(id,finalPrice)=>{
    try{
    const token = localStorage.getItem(`userToken`)
const{data}=await axios.post(`https://ecommerce-node4-five.vercel.app/cart`,{
  productId:id},
  {
    headers:{
      Authorization:`Tariq__${token}`
    }
  } 
  );
  console.log(data);
  toast('the product has been added successfulley')
  localStorage.setItem('cartNum',data.cart.products)
  setcartNumber(data.cart.products)
localStorage.setItem('num',data.cart.products.length)
setNumber(data.cart.products.length)
setPraic(price+finalPrice);
localStorage.setItem('price',price);
}
catch(error){
  if(error.response.data.message=='product already exists')
  toast('product already exists'); 
}

  }
  useEffect( ()=>{
    getData();
  } , [])
 
  return (
    <>
      {product.map((ele) =>
    <div key={ele.id} className={style.productCard}> 
      <img src= {ele.mainImage.secure_url} className={style.productImage} />
      <h2 className={style.productName}>{ele.name}</h2>
      <h3 className={style.productName}>price={ele.price}</h3>
      {userName?
              <button className='btn btn-outline-danger' onClick={()=>addToCart(ele._id,ele.finalPrice)}> addtocart</button>
              :
              <></>
      }
      
      <Link  to={`/Detiles?id=${ele.id}`} className={style.link}>ShowDetelis</Link>
      </div>
      
      ) 
      }
    </>
  )
}

export default Products


