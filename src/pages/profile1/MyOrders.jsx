
import { Link } from 'react-router-dom'
import {useState ,useEffect} from 'react'
import axios from 'axios'
import { UserContext } from '../../context/user'
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import style from './myOrder.module.css'; 
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

function MyOrders() {
  const [data,setData]=useState([]);

  const getData = async ()=>{
    const token = localStorage.getItem(`userToken`)
    const {data}= await axios.get(`https://ecommerce-node4-five.vercel.app/order`, {
    headers:{
      Authorization:`Tariq__${token}`
    } 
    });
  console.log(data);
  setData(data.
    orders);
    console.log(data.orders);

  };
  const remove= async(id)=>{
    const token = localStorage.getItem(`userToken`)
    console.log("hi1")
    const{data}=await axios.patch(`https://ecommerce-node4-five.vercel.app/order/cancel/${id}`,{},
      {
        headers:{
          Authorization:`Tariq__${token}`
        }
      } 
      );
      console.log("hi2")
      console.log(data);
      
      console.log("hi3")
      getData();
    toast('the order cancel')
  };

  useEffect( ()=>{
    getData();
  } , [])
  return (
    <>
        {data.map((ele) =>
    <div key={ele._id} className={style.orderCard} > 
    <div className={style.productName}>
      <h4>address:{ele.address}</h4>
      <h4>phoneNumber :{ele.phoneNumber}</h4>
<h4>paymentType :{ele.paymentType}</h4>
<h4>status :{ele.status}</h4>
<h4>finalPrice:{ele.finalPrice}</h4>


<button className='btn btn-outline-danger' onClick={()=>remove(ele._id)}> cancle</button>
<p>        </p>
<p>**************</p>
</div>
<div>
<p>Products included in the order</p>
  <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
>
{ele.products.map((ele1)=>
<div>
   <SwiperSlide><img src={ele1.productId.mainImage.secure_url
   
} /></SwiperSlide>
</div>
)
}
        </Swiper>
</div>



      </div>
      ) 
      }
    </>
  )
}

export default MyOrders
