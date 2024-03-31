import axios from 'axios';
import React, { useState } from 'react'
import { addMethod, object, string } from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from './singUp.module.css'; 
function SingUp() {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
  })

const [error ,setErrors]=useState([]);
const [loader,setLoader] =useState(false);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,// تعني انو افرض القديم 
      [name]: value
    });
  };

  const handelImageChange= (e)=>{
    const { name, files } = e.target;
    setUser({
    ...user,
    [name]:files[0],//هاد بحتوي على الصوره بحالها 
    });
  };
const vilidateData =async ()=>{
  const RegisterSchema=object({
    //بنكتب كل اشكال الداتا الي عنا ++ الشروط الي عليها 
    userName :string().min(5).max(20) ,
    email :string().email().required() ,
    password :string().min(8).max(20).required() ,
    image : string().required(),
  });
  try{
      // عمليه المطابقه بتوخد وقت لذلك 
  //بحط 
  //await
 await RegisterSchema.validate(user,{abortEarly:false}); //بدي اطابق هاي الشروط مع اليوزر الموجود عندي 
 //رح يوخد اليوزر ويمشي على القواعد الي معنا 
 //abortEarly:false 
 //هاي تعني لو عنا اكثر من خطأ ترجعلنا اياه كله  
 // باي ديفولت هي ترو انو ترجع خطا واحد 
 return true;
  }
  catch(errorl){
    setErrors(errorl.errors);
    setLoader(false);
    return false;
    }

}

const handelSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);

    const validate=await vilidateData();
const formData= new FormData();
formData.append('userName',user.userName);
formData.append('email',user.email);
formData.append('password',user.password);
formData.append('image',user.image);

try{
  const{data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,formData);
console.log(data);

  if(data.status === "Active" ){
    toast('success!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
      
}
navigate('/');
}
catch(error){
  console.log("hi");
if(error.response.status === 409){
    toast('email already exists');
}
  
}
finally{
  setLoader(false);
}


};

  return (
    <>
    <div className={style.singUp}>
   <h1 className={style.h1}>singUp</h1>
      <form className={style.form} onSubmit={handelSubmit}>
        <label className={style.lable}>userName</label>
        <input type="text" className={style.input} value={user.userName} name="userName" onChange={handelChange} />
        <p>{error[0]}</p>
        <label className={style.lable}>email</label>
        <input type="email"  className={style.input} value={user.email} name="email" onChange={handelChange} />
        <p>{error[1]}</p>
        <label className={style.lable}> password</label>
        <input type="password"  className={style.input} value={user.password} name="password" onChange={handelChange} />
        <p>{error[2]}</p>
       
        <input type="file" className='form-control'  name="image" onChange={handelImageChange} />
        {/*كيف اخلي البوتون مسكر ؟ انو لما اكبس علي يغلق تا يعرف انو هل الاشي صح انو الايميل صح ؟ او */}
       <button type="submit" className='btn btn-outline-success' disabled={loader? 'disabled' : ''}>{!loader ?'regester' :'wait...'}</button>
      </form>
      </div>
    </>
  )
}
export default SingUp
