import React, { useState } from "react";
import style from "./SendCode.module.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';

function SendCode() {
  const navigate=useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.patch(
   `   ${import.meta.env.VITE_API_URL}/auth/sendcode`,
      {
        email: userEmail,
      }
    );
    toast.success('Plz check your Email !', {
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
          navigate('/ForgetPassword');
  };

  const handelChange = (e) => {
    // console.log("e= ", e.target);
    const email = e.target.value;
    console.log("Email=", email);
    setUserEmail(email);
    // console.log("userEmail= ", userEmail);
  };
  // if(loder) {
  //   return <Loader/>;
  // }
  return (
    <>

        <div className={style.order}>
        <h1 className={style.h1}>SendCode</h1>
          <form onSubmit={handelSubmit} className={style.form}>
            <p>Please enter your email to try to change your password</p>

              <label className={style.lable}>Email</label>
              <input  type="email" className={style.input}  value={userEmail} name="userEmail" onChange={handelChange}
              />
           <button type="submit" className="btn btn-outline-dark s">
              submit
            </button>
          </form>
        </div>
    </>
  );
}

export default SendCode;