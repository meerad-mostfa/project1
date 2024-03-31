import axios from 'axios';
import React, { useContext, useState } from 'react'
import { addMethod, object, string } from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from './Sigin.module.css'; 
import { UserContext } from '../../context/user';
import { Link } from 'react-router-dom';
function Sigin() {
 const  {setUserTocken}= useContext(UserContext);
  const navigate=useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
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

const vilidateData =async ()=>{
  //يفضل تكون الاسماء بتدل على معناها 
  const SinginSchema=object({
    //بنكتب كل اشكال الداتا الي عنا ++ الشروط الي عليها 
    email :string().email().required() ,
    password :string().min(8).max(20).required() ,
  });
  try{
      // عمليه المطابقه بتوخد وقت لذلك 
  //بحط 
  //await
 await SinginSchema.validate(user,{abortEarly:false}); //بدي اطابق هاي الشروط مع اليوزر الموجود عندي 
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


try{
  const{data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,{
    email:user.email,
    password:user.password
  });
  console.log(data);
  

  if(data.message==="success"){
    toast('You have been logged in successfully'); 
}
localStorage.setItem('userToken',data.token);
setUserTocken(data.token);
navigate('/');
}
catch(error){
console.log(error);
toast(error.response.data.message);
}

finally{
  setLoader(false);
}


};

  return (
    <>
    <div className={style.singIn} >
   <h1 className={style.h1}>singIn</h1>
      <form onSubmit={handelSubmit} className={style.form}>
      
        <label className={style.lable}>email</label>
        <input type="email" className={style.input}  value={user.email} name="email" onChange={handelChange} />
     
        <label className={style.lable}> password</label>
        <input type="password"  className={style.input} value={user.password} name="password" onChange={handelChange} />
   
       
      
        {/*كيف اخلي البوتون مسكر ؟ انو لما اكبس علي يغلق تا يعرف انو هل الاشي صح انو الايميل صح ؟ او */}
       <button type="submit" className='btn btn-outline-success' disabled={loader? 'disabled' : ''}>{!loader ?'regester' :'wait...'}</button>
       <Link className="nav-link btn btn-outline-success " to='/SendCode'>هل نسيت كلمه السر ؟</Link>
      </form>
      </div>
    </>
  )
}
export default Sigin
