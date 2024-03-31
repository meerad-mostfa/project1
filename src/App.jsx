import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
import Cart from './pages/Cart/Cart';
import Categories from './pages/Categories/Categories';
import Sigin from './pages/Signin/Sigin';
import SignUp from './pages/Signup/SignUp';
import Products from './pages/products/Products';
import Home from './Home/Home';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Detiles from './pages/deteles/Detiles';
import Products1 from './pages/products1/Products1';
import ProductRegister  from './componants/ProductRegister';
import UserContextProvider from './context/user';
import Order from './pages/order/Order';
import Profile from './pages/profile/Profile';
import About from './pages/profile1/About';

import Contact1 from './pages/profile1/Contact1';
import Profile1 from './pages/profile1/Profile1';
import MyOrders from './pages/profile1/MyOrders';
import Riv from './pages/riview/Riv';
import SendCode from './pages/SendCode/SendCode';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
const router = createBrowserRouter([
  {
    path: "/",//مجرد ما يفتح اليوزر البرنامج رح يظهرلو هاي الصفحه 
    element: <Root/>
   , children : [{
    path: '/Cart',
    element: <Cart />
   
  },{
    path: "/", 
    element: <Home />
  },
  {
    path: "/SendCode",
   element : <SendCode />

  },  {
    path: "/ForgetPassword",
   element : <ForgetPassword />

  },

  {
    path: "/Categories",
   element : <Categories />

  },
{
  path: "/Sigin",
  element: <Sigin />

},

{
  path : "/SignUp" ,
  element : <SignUp />
},
{
  path : "/Cart" ,
  element : <Cart />
}
,
{
  path : "/Products1",
  element:
 <ProductRegister>
  <Products1/>
  </ProductRegister>
},
{
  path : "/Detiles",
  element: <Detiles />
},
{
  path : "/Products",
  element: <Products/>
},
{
  path: "/Order",
  element: <Order />

},
{
  path :"/reviews",
  element: <Riv />
}
,
{
  path: "/Profile",
  element: <Profile />,
  children :[
    {
      path :"/Profile/",
      element :<About />
    },
    {
      path :"/Profile/Profile1",
      element :<Profile1 />
    }, {
      path :"/Profile/MyOrders",
      element :<MyOrders />
    },
    {
      path :"/Profile/Contact1",
      element :<Contact1 />
    },
  ]

}

] 
  }

]) 

function App() {
 
  return (
    <>
    <UserContextProvider>
    <RouterProvider router={router} />
    
    </UserContextProvider>
   
    
<ToastContainer />

    </>
  )
}

export default App
