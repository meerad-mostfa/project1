
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { UserContext } from '../../context/user'
function Profile1() {


  return (
    <>
     <div>
  <nav   className="navbar navbar-expand-lg bg-body-tertiary navbar sticky-top  " >
    <div className="container-fluid">
      
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
          <li className="nav-item">
            <Link className="nav-link "  to='/Profile/'>About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to='/Profile/MyOrders'>MyOrders</Link>
          </li> 
          <li className="nav-item">
            <Link className="nav-link " to='/Profile/Contact1'>Contact</Link>
          </li>
         </ul>
           </div>
           </div>
  </nav>
</div> 

    </>
  )
}

export default Profile1
