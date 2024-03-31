import React from 'react'
import { useEffect, useState } from 'react'
import style from './Categories.module.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom';


function Categories() {
  const[product,setProduct]=useState([]);
  const getData = async ()=>{
    const {data}= await axios.get(`https://ecommerce-node4-five.vercel.app/categories/active?page=1&limit=9`);
    setProduct(data.categories);
  };
  useEffect( ()=>{
    getData();
  } , [])

  return (
  <>
{product.map((ele) =>
    <div className={style.categoryCard} key={ele.id}> 
      <img src= {ele.image.secure_url} className={style.categoryImage} />
      <h2 className={style.categoryName}>{ele.name}</h2>
      <Link  to={`/Products?id=${ele.id}`} className={style.link} >showProducts</Link>

      </div>
      ) 
      }
  </>
  )
}

export default Categories
