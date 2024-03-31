import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        code:'',
    });
    const navigate=useNavigate();

    const handelSubmit = async (e) => {
      e.preventDefault();
      try{
      const { data } = await axios.patch(
       ` ${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
        {
            "email":user.email,
            "password":user.password,
            "code":user.code,
        }
      );
      toast.success('😄 The password has been changed successfully !', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });

        navigate('/');
    }
      catch(err){
        console.log(err);
        if(err.response.data.message=='invalid code'){
            toast.error('invalid code', {
                position: "bottom-right",
                autoClose: 3000,
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
    };
    const handelChange = (e) => {
      console.log("e= ", e.target);
      const {name,value} = e.target;
      setUser({
       ...user,
          [name]:value
      });
      // console.log("userEmail= ", userEmail);
    };
    return (
              <>
             
                  <div className={style.order}  >
                  <h1 className={style.h1}>forgetPassword</h1>
                    <form onSubmit={handelSubmit} className={style.form}>
                   
                        <label className={style.lable}>Email</label>
                        <input 
                        placeholder='Enter your email'
                          type="email"
                          value={user.email}
                          name="email"
                          onChange={handelChange}
                          className={style.input}
                        />
                  
                           <label className={style.lable}>New password</label>
                        <input 
                        placeholder='Enter the new password'
                          type="password"
                          value={user.password}
                          name="password"
                          onChange={handelChange}
                          className={style.input}
                        />
                    
                      
                        <label className={style.lable}>Code</label>
                        <input placeholder='Enter the code'
                          type='text'
                          value={user.code}
                          name="code"
                          onChange={handelChange}
                          className={style.input}
                        />
                  
                      <button type="submit" className="btn btn-outline-dark s">
                        submit
                      </button>
                      {/* {style.s} */}
                      {/* <button type="submit" className="s" disabled={loder?'disabled':''}  >{!loder?'submit':<Loader/>}</button> */}
                    </form>
                  </div>
              </>
            );
}

export default ForgetPassword