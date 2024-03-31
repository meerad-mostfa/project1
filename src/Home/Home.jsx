import React from 'react'
import { useEffect, useState } from 'react'
import style from './home.module.css'; 
import axios from 'axios';
import  { useRef} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './styles.css';

// import required modules
import { EffectCards } from 'swiper/modules';
// Import Swiper React components

function Home() {
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
<Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {product.map((ele1)=>
<div>
   <SwiperSlide><img src={ele1.image.secure_url}
   /></SwiperSlide>
</div>
)
}
  </Swiper>
     
    </>
  )
}

export default Home
