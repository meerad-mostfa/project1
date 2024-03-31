import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/user'
function Navbar() {

const {userName ,setUserName,setUserTocken,cartNum,num} = useContext(UserContext);
const logOut= ()=>{
  setUserName(null);
  setUserTocken(null);
  
}
  return (
 <>

<div>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
          <li className="nav-item">
            <Link className="nav-link "  to='/' >HOME</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to='/Categories'>Categories</Link>
          </li> 
          <li className="nav-item">
            <Link className="nav-link " to='/Products1' >Products</Link>
          </li>
         
          <div className="d-flex">
          {
            userName ?
        
              <>  
                <li className="nav-item">
                <Link className="nav-link " to='/Cart' >cart🛒 {localStorage.getItem('num')?localStorage.getItem('num'):0} </Link>
              </li>
        
              <li className="nav-item">
            <Link className="nav-link "  to='/Profile'>{userName} </Link>
          </li>
          <li className="align-items-xl-end">
            <Link className="nav-link" ><button  className='btn btn-outline-danger ' onClick={logOut}>logout</button> </Link>

          </li>
          </>
            :
            <>
            <li className="nav-item ">
            <Link className="nav-link " to='/Sigin' >Sigin</Link>
          </li>    <li className="nav-item">
            <Link className="nav-link " to='/SignUp' >SignUp</Link>
          </li>
            </>
          }
          </div>
         
           </ul>
           
           </div>
           </div>
  </nav>
</div>


 </>
  )
}

export default Navbar
