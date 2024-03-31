import React, { useContext } from 'react'
import axios from 'axios';
import style from './Products1.module.css'; 
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";

import { useEffect, useState } from 'react'
import { UserContext } from '../../context/user';
function Products1() {
    const[product,setProduct]=useState([]);
    const[product1,setProduct1]=useState([]);
    
    const {userName ,setUserName,setUserTocken} = useContext(UserContext);

    const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );


    const getData = async ()=>{
      const {data}= await axios.get(`https://ecommerce-node4-five.vercel.app/products?page=1&limit=50`);
      setProduct(data.products);
    };
    const getData1 = async ()=>{
      const {data}= await axios.get(`https://ecommerce-node4-five.vercel.app/products?page=${currentPage}&limit=6`);
      setProduct1(data.products);
    };
      
    const [showProductList, setShowProductList] = useState(product);

    const setLowToHigh = () => {
      const sortedProducts = product1.sort((a, b) => a.price - b.price);
      setShowProductList([...sortedProducts]);
    };
    const setHighToLow = () => {
      const reverseSortedProducts = product1.sort((a, b) => b.price - a.price);
      setShowProductList([...reverseSortedProducts]);
    };
    const restList = () => {
      const resetList = product1;
      setShowProductList([...resetList]);
    };
    useEffect( ()=>{
      getData(); 
      getData1();
     
  }
     , [currentPage]) 
     
     const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
     
     <button onClick={setLowToHigh}>Low To High</button>
      <button onClick={setHighToLow}>High To Low</button>
         {product1.map((ele) =>
    <div key={ele.id} className={style.productCard}> 
      <img src= {ele.mainImage.secure_url} className={style.productImage} />
      <h2 className={style.productName}>{ele.name}</h2>
      <h3 className={style.productName}>price={ele.price}</h3>
      <Link  to={`/Detiles?id=${ele.id}`} className={style.link}>ShowDetelis</Link>
      </div>
      ) 
      }
 


      <div style={{textAlign:"center"}}>
        <button  className='btn btn-outline-success'
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from(
          { length: Math.ceil(product.length / productsPerPage) },
          (_, index) => (
            <button   className='btn btn-outline-success' key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}

        <button  className='btn btn-outline-success'
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastProduct >= product.length}
        >
          Next
        </button>
      </div>
    
    </>
  )
}

export default Products1
