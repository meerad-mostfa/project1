import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

const UserContextProvider =({children})=>{
    const[userToken,setUserTocken]=useState(localStorage.getItem('userToken'));
    const [price,setPraic]=useState(0);
    //عرفتها داحل اليوزر عشان يرجعليي كل المعلومات عن ليوزر 
    //بالبدايه بتكون null
    //لما اغير الحاله انو المستخدم يسجل دخول بتغير معنا الوضع 

    const[cartNum,setcartNumber]=useState(localStorage.getItem('cartNum'));

    const[num,setNumber]=useState(localStorage.getItem('num'));
  const[profil,setProfile]=useState(null);
    const[userName,setUserName]=useState(null);
    //ايش بنستفيد من هاي الخطوه ؟
    //انو بصير اعطي ال فاليو  الي ب\دي يوخدها 
    // هيك بصير اي كومبوننت موجود عنا بالمشروع بقدر يشوف المتغير الي اسمو  يوزر نام 
 

    // اول ما تتغير عنا ال useToken 
    // رح يتغير عنا اشي معين 
      // اكيد رح استخدم ال يوز ايفيكت 
      // رح تشتغل اول ما يشتغل البرنامج ولما يتغير اليوزر توكين
    const getUserData =()=>{
        //لازم افحص اذا في توكين او لء 
        if(userToken!=null){
            const decoded = jwtDecode(userToken);
            setUserName(decoded.userName);
            // الديكوديد تحتوي على كل اشي من يوزر نام والايدي
    //decoded
    // بتحتوي على كل المعلومات الي برجعلنا اياها الباك ايند
        }

    }
      useEffect(()=>{
        getUserData();
      },
      [userToken])
return (<UserContext.Provider value={{setUserTocken , userName,setUserName,cartNum,setcartNumber,num,setNumber,price,setPraic,profil,setProfile}}>
    {children}
</UserContext.Provider>
)

};
export default UserContextProvider;