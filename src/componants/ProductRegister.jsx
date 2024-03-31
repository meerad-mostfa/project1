import React from 'react'
import { Navigate } from 'react-router-dom'

function ProductRegister({children}) {
   const token=localStorage.getItem('userToken');
    if(!token){
       return <Navigate to='/Sigin' replace/>
    }
  return children ;
}

export default ProductRegister
