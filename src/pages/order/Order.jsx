
import React, { useContext } from 'react'
import axios from 'axios';
import style from './order.module.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addMethod, object, string } from 'yup';
import { useEffect, useState } from 'react'
import { UserContext } from '../../context/user';
function Order() {
  const {setcartNumber,userName ,setNumber ,price,setPraic }=useContext(UserContext);
    const [user, setUser] = useState({
        address:'',
        phone:'',
        couponName:'',
    
     
      })
    
   /* const getData = async ()=>{
        const {data}= await axios.post(`https://ecommerce-node4.vercel.app/order`);
        setProduct(data.products);
      };*/
      const navigate=useNavigate();
    const [error ,setErrors]=useState([]);
    const [loader,setLoader] =useState(false);
    
      const handelChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,// تعني انو افرض القديم 
          [name]: value
        });
      };
    
      const vilidateData =async ()=>{
        const RegisterSchema=object({
          //بنكتب كل اشكال الداتا الي عنا ++ الشروط الي عليها 
          address:string().required() ,
          phone:string().required() ,
        });
        try{
            // عمليه المطابقه بتوخد وقت لذلك 
        //بحط 
        //await
       await RegisterSchema.validate(user,{abortEarly:false}); //بدي اطابق هاي الشروط مع اليوزر الموجود عندي 
       //رح يوخد اليوزر ويمشي على القواعد الي معنا 
       //abortEarly:false 
       //هاي تعني لو عنا اكثر من خطأ ترجعلنا اياه كله  
       // باي ديفولت هي ترو انو ترجع خطا واحد 
       return true;
        }
        catch(errorl){
          setErrors(errorl.errors);
          setLoader(false);
          return false;
          }
      }
    
    const handelSubmit = async (e) => {
        e.preventDefault();
        setNumber(0);
        const validate=await vilidateData();
        setLoader(true);
    try{
        const token = localStorage.getItem(`userToken`)
      const{data} = await axios.post(`https://ecommerce-node4-five.vercel.app/order`,
      {
            couponName:user.couponName,
            address:user.address,
            phone:user.phone
      },
      {
        headers:{
            Authorization:`Tariq__${token}`
          }
      }
      );
    console.log(data);
    
      if(data.message === "success"){
        toast('success!')
       
    }

    setPraic(0);
   // navigate('/');
    }
    catch(error){
      console.log("hi");
   /* if(error.response.status === 409){
        toast('email already exists');
    }*/
    
    
    };
}
  
   

  return (
    <>
       <div className={style.order} >
   <h1 className={style.h1}>order</h1>
      <form onSubmit={handelSubmit} className={style.form}>
      
        <label className={style.lable}>Address</label>
        <input type="text" className={style.input}  value={user.address} name="address" onChange={handelChange} />
     
        <label className={style.lable}> Phone Number</label>
        <input type="text"  className={style.input} value={user.phone} name="phone" onChange={handelChange} />
   
        <label className={style.lable}> couponName</label>
        <input type="text"  className={style.input} value={user.couponName} name="couponName" onChange={handelChange} />
      
        {/*كيف اخلي البوتون مسكر ؟ انو لما اكبس علي يغلق تا يعرف انو هل الاشي صح انو الايميل صح ؟ او */}
       <button type="submit" className='btn btn-outline-success' disabled={loader? 'disabled' : ''}>submit</button>
      </form>
      </div>
    </>
  )
}

export default Order

