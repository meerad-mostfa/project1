import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../../context/user';
import style from './cart.module.css'; 
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
function Cart() {
  const[cartProducts,setCart]=useState([]);
  const[pric,setPric]=useState(0);
  const {cartNum,setcartNumber,setNumber,num,price,setPraic } = useContext(UserContext);
  const getData = async ()=>{
    const token = localStorage.getItem(`userToken`)
    const {data}= await axios.get(`https://ecommerce-node4-five.vercel.app/cart`, {
    headers:{
      Authorization:`Tariq__${token}`
    }
    });
   setCart(data.products);
  };
  const clearCart=async()=>{
    setPraic(0);
    console.log(cartNum)
    console.log("lvpfh")
    const token = localStorage.getItem(`userToken`)
   const {data}= await axios.patch(`https://ecommerce-node4-five.vercel.app/cart/clear`,null, {
    headers:{
      Authorization:`Tariq__${token}`
    }
    });
   setcartNumber(null);
   console.log(cartNum)
   setCart([]);
   localStorage.setItem('num',0);
    setNumber(0);
 };
 const price1=price;
/**/ 
 const removeItem=async(id,finalPrice)=>{
  setPraic(price-finalPrice);
  const token = localStorage.getItem(`userToken`)

        const {data}= await axios.patch( `https://ecommerce-node4-five.vercel.app/cart/removeItem`,{
          productId:id
        },
     {
        headers: {
          Authorization:`Tariq__${token}`
        }
      });
     
   
      // serCartProducts(data.cart.products);
      localStorage.setItem('num',data.cart.products.length);
      getData();
      setNumber(data.cart.products.length)
        toast('The product has been cansled successfully'); 
}

/**/ 
const handlePice =()=>{
  let p =0;
  cartProducts.map (c =>{
    p += c.details.price * c.quantity
  })
   setPric(p);
}
useEffect( ()=>{ handlePice ();})


const increaseQty=async(productId,finalPrice)=>{

try{
const token=localStorage.getItem('userToken');
    const {data}= await axios.patch(` ${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{
      productId
    },
 {
    headers: {Authorization:`Tariq__${token}`}
  })
  console.log(data);
  getData();
  setPraic(price+finalPrice);
}
catch(err){
console.log('error',err);
toast.error(err.response.data.message, {
position: "bottom-right",
autoClose: 7000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
}

}

const decreaseQty=async(productId,finalPrice)=>{
console.log('increaseQty');
try{
  const token=localStorage.getItem('userToken');
      const {data}= await axios.patch( `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{
        productId
      },
   {
      headers: {Authorization:`Tariq__${token}`}
    })
    
    getData();

    (data.cart.products).map((p)=>{
              if(p.quantity==0){
                removeItem(p.productId)
              }
      }
    )
    setPraic(price-finalPrice);

  }
catch(err){
console.log('error',err);
}

}

  useEffect( ()=>{
    getData(); 
 
}
   , [])

   
  return (
    <>
        {cartProducts.length>0?
    <div className={style.all}>
    <div className={style.carts}>
    {
cartProducts.map((pro)=>(
          < >       
<div className={style.cardBody}>
<div className={style.cardBody1}>
<label className={style.title} >Image</label>
<img src={pro.details.mainImage.secure_url} alt={pro.details.name}/>
</div>
<div className={style.cardBody1}>
<label className={style.title}>Product name</label>
<h6 >{pro.details.name}</h6>
</div>
<div className={style.cardBody1}>
<label className={style.title}>Price $</label>
<p className="card-text"> {pro.details.price * pro.quantity} </p>
</div>
<div className={style.cardBody1}>
<label className={style.title}>Discount %</label>
<p className="card-text"> {pro.details.discount } </p>

</div>
<div className={style.cardBody1}>
<label className={style.title}>finalPrice $</label>
<p className="card-text"> {pro.details.finalPrice * pro.quantity}</p>

</div>
<div className={`${style.cardBody1}   `}>
<label className={style.title}>Quantity</label>
<div className='d-flex align-items-baseline  justify-content-center gap-1'>


  <button onClick={()=>increaseQty(pro.productId,pro.details.finalPrice)} className={style.button1}>

   +
  </button>
<p className={style.cardText}> {pro.quantity}</p>
<button className={style.button1} onClick={()=>decreaseQty(pro.productId,pro.details.finalPrice)}>
-
  </button>
</div>
</div>
        <button onClick={()=>removeItem(pro.productId,pro.details.finalPrice)} 
         className={`btn btn-outline-danger
         success ${style.buttonRemove} `}>Remove
         </button>              
         </div>
          </>       
      ))
    }  
    </div>    

     <div className={style.rightDiv}>   
     <div className={style.nine}>
  <h2>MEEM SHOP<span>Your Cart 🛒</span></h2>
</div>
<div className={style.pardiv}>
<p className={style.par}> finalPrice is =  {pric}$</p>
</div>

<button onClick={()=>clearCart()} className={` btn btn-dark ${style.button2}`}> clear cart</button>
{num>0?
  <button className={style.buttonu}><Link to="/Order" className={style.link}>Order</Link></button>
    :
    <></>
}
    
      

</div>

     </div>
     :<h2 className={style.noCart}>no products in the cart</h2>
    }

</>
  )
}

export default Cart
