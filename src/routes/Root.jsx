import React from 'react'
import Navbar from '../componants/Navbar'
import Footer from '../componants/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Categories from '../pages/Categories/Categories'
function Root() {


  return ( 
    <>
    <Navbar/>

<Outlet />
    
    <Footer />

    </>
  )
}

export default Root
