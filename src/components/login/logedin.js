import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logedin = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({});
  const [order, setOrder] = useState([]);
  const name = userdata.name;
  const email = userdata.email;
// serOrder(orders);

  const api = axios.create({
    baseURL: "https://backend-pied-phi.vercel.app",
    withCredentials: true,
  });

const get =  async() => {
try{
 const res = await api.get("/account");


if(res.status ===200){

//  const email =  res.data.email;
//  const name =  res.data.name;
const user ={
 email : res.data.userData.email,
 name : res.data.userData.name

}
const order = res.data.orders
setOrder(order)
setUserdata(user)
console.log(order);


}
else if(res.response.status === 401){
 alert()
// setShow(true);
navigate("/login");
}
console.log(res);
}
catch(error){
  if (error.response && error.response.status === 401) {
    // Token not present or invalid, navigate to login
    navigate("/login");
  }
// console.log(res);
}
}

const deletetoken = async() =>{
  try {
    const res = await api.get("/account?clearToken=true");
     navigate("/login")
  } catch (error) {
    console.error(error);
   navigate("/login");
  }
}
useEffect(() =>{
  get();
  },[])
  //  console.log(uemail.userdata.email);
  return (
    <div className="md:container md:mx-auto md:px-14">
    <div>
      <p className="p-4">Home/Account Details</p>
    </div>
      <div >
        <div>
            <p className='text-center text-4xl py-5'>
                My Account
            </p>
        </div>
        <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-12 md:order-none  order-last md:col-span-8'>
                {/* ----------------------------------------  */}
               <div className='border-b border-black'>
                <p className='text-3xl'>Order History</p>
                </div> 
                <div>
                   
{order.map((val , index) =>(
  <table className="w-full ">
  <tr key={index}className="border-b border-gray-300" >
    {val.cart.map((val1 , index1) =>(
        <React.Fragment> 
           
    <td className="p-4 flex " >
   
         <div className="">
        <img src={val1.image[index1]} className="h-20 border border-gray-300 rounded-md"/>

      <p className=" font-bold">
     {val1.name}
      </p>
      <p>
       <span className="font-bold">
        Sku:
        </span> {val1.sku}
      </p>
      <p>
       {/* {val.cart[index].quantity} X {val.cart[index].price} */}
      </p>
     </div>
     
    </td>
  
     
     
      </React.Fragment>
    ))}
       <td className="font-bold text-top text-nowarp">
    Total: {val.totalprice}
      </td>
      <td>
      {val.date}
      </td>
       </tr>
 </table>
))}
                  
                </div>
            </div>


            <div className=' col-span-12 md:col-span-4'>
<div className=''>
  <div className='flex gap-20 border-b border-black '>
  <p className='text-3xl'>Account Details</p>
<p className='text-blue-500 cursor-pointer' onClick={deletetoken}>
    LogOut
</p>
  </div>
<div>
    <p>
       <span className="font-bold p-2">
       name:
        </span>{name}
    </p>
    <p>
      <span className="font-bold p-2">
      email:
        </span> {email}
    </p>
</div>
</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Logedin
