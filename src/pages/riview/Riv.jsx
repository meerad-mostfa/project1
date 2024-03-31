import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import style from './riv.module.css'; 
function Riv() {

    const {id} =useParams('id');

 const [user, setUser] = useState({
    comment:'',
    rating:''
 })
 const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,// تعني انو افرض القديم 
      [name]: value
    });
  };

  const handelSubmit = async (e) => {
   
    e.preventDefault();
    const urlParams= new URLSearchParams(window.location.search);
    const id=urlParams.get('id');   
    console.log(id)
    try{
    const token = localStorage.getItem(`userToken`)
  const{data} = await axios.post(`https://ecommerce-node4-five.vercel.app/products/${id}/review`,{
    comment:user.comment,
    rating:user.rating
  },{
    headers:{
        Authorization:`Tariq__${token}`
      }  
  });
  console.log(data);
  if(data.message= 'success')
  toast('Your comment has been successfully posted '); 
    }
    catch(err)
    {
        console.log(err)
    }
  

};
  return (
    <>
      <div className={style.order} >
   <h1 className={style.h1}>review</h1>
      <form onSubmit={handelSubmit} className={style.form}>
      
        <label className={style.lable}>comment</label>
        <input type="text" className={style.input}  value={user.comment} name="comment" onChange={handelChange} />
     
        <label className={style.lable}> rating</label>
        <input type="text"  className={style.input} value={user.rating} name="rating" onChange={handelChange} />
   
        {/*كيف اخلي البوتون مسكر ؟ انو لما اكبس علي يغلق تا يعرف انو هل الاشي صح انو الايميل صح ؟ او */}
       <button type="submit" className='btn btn-outline-success' >submit</button>
      </form>
      </div>
    </>
  )
}

export default Riv

