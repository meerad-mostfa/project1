import React from 'react'
import { Link } from 'react-router-dom'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { UserContext } from '../../context/user'
function Contact1() {
  const [data,setData]=useState([]);

  const getData = async ()=>{
    const token = localStorage.getItem(`userToken`)
    const {data}= await axios.get(`https://ecommerce-node4-five.vercel.app/user/profile`, {
    headers:{
      Authorization:`Tariq__${token}`
    } 
    });
  console.log(data);
  setData(data.user);
  
  };
  useEffect( ()=>{
    getData();
  } , [])

  return (
    <>
  <h2>{data.email}</h2>
  <h2>{data.role}</h2>
    </>
  )
}

export default Contact1

