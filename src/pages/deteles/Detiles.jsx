
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import style from './deteles.module.css'; 
import { UserContext } from '../../context/user';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
function Detiles() {
  const {setcartNumber,userName ,setNumber ,price,setPraic }=useContext(UserContext);
    const[product1,setProduct]=useState([]);
    const[imag,setImage]=useState([]);
    const[reviews,setReviews]=useState([]);
    
    const getData = async ()=>{
      const urlParams= new URLSearchParams(window.location.search);
  const id=urlParams.get('id');
  const {data}= await axios.get(`https://ecommerce-node4-five.vercel.app/products/${id}`);
 setProduct(data.product);
 setImage(data.product.subImages);
 setReviews(data.product.reviews);
    };

    const addToCart= async(id)=>{
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

<Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
{imag.map((e)=>
<div>
        <SwiperSlide><img src= {e.secure_url} /></SwiperSlide>
        </div>
)
}
      </Swiper>
<div className={style.detelesCard}>
<h2 className={style .detelesName}>{product1.name}</h2>
      <h2 className={style .detelesName}>discount= {product1.discount}</h2>
      <p className={style .detelesName}>description: {product1.description}</p>
      <h3 className={style .detelesName}>stock:{product1.stock}</h3>
      <h3 className={style .detelesName} >price={product1.price}</h3>
      <p className={style .detelesName}>finalPrice:{product1.finalPrice}</p>
      {userName?
              <button className='btn btn-outline-danger' onClick={()=>addToCart(product1._id)}> addtocart</button>
              :
              <></>
      }
 
</div>

     <h1 className={style.h1}>Here are some customer responses & reviews</h1>
{reviews.map((e1) =>
<div className={style.reviewsCard} >
    <p>name:{e1.createdBy.userName}</p>
<p>rating:{e1.rating}</p>
<p>comment:{e1.comment}</p>
</div>
)};

<button className='btn btn-outline-success'><Link to={`/reviews?id=${product1._id}`}
        >reviews</Link></button>

    </>
  )
}

export default Detiles
