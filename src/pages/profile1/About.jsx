import React, { useContext } from 'react'
import { UserContext } from '../../context/user'
import { Link } from 'react-router-dom'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import style from './about.module.css'; 
function About() {
  const [data,setData]=useState([]);
  const[imag,setImage]=useState([{}]);
  const getData = async ()=>{
    const token = localStorage.getItem(`userToken`)
    const {data}= await axios.get(`https://ecommerce-node4-five.vercel.app/user/profile`, {
    headers:{
      Authorization:`Tariq__${token}`
    } 
    });
  console.log(data);
  setData(data.user);
  setImage(data.user.image.secure_url)
  };
  useEffect( ()=>{
    getData();
  } , [])
  return (
    <>
    <div className={style.aboutCard }>
  <h1>{data.userName}</h1>
  <img src={imag } />

</div>

    </>
  )
}

export default About
