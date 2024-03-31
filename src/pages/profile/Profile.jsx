import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom" 
import About from '../profile1/About'
import Contact1 from '../profile1/Contact1'
import MyOrders from '../profile1/MyOrders'
import Profile1 from '../profile1/Profile1'
function Profile() {
  return (
    <>
    <Profile1 />
  <Outlet /> 
    </>
  )
}

export default Profile
