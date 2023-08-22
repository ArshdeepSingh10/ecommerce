import React, { useEffect, useState } from "react";

import { FaBars, FaCartShopping, FaUser, FaXmark} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const [show , setShow] = useState(true)
  const [icon , setIcone] = useState(<FaBars/>)
  const [carts , setCarts] = useState(0);
  const items = useSelector((state) => (state.cart.items));
  
  const cartData = sessionStorage.getItem('cartItems');
    const cart = JSON.parse(cartData);
 
  const done = () =>{
if(show) {
  setIcone(<FaXmark />);
  
} else {
  setIcone(<FaBars />);
}

setShow(!show);
  }
  useEffect(() => {
    const c = cartData.length;
    setCarts(c);
  },[cartData]);
  return (
    <div className="z-50 sticky top-0 bg-white">
      
      <nav className="">
        <div className="grid grid-cols-3  p-4  border-b ">
        <div className="md:col-span-1 col-span-2 ">
          <Link to='/'><img src="logo.png" alt="imageofshopping" className="h-10" /></Link>  
        </div> 
        <div className={` absolute left-0 md:relative md:top-0  top-16 w-full md:w-auto bg-white md:border-0 border-t-2 border-b-2 border-gray-500   ${show ?'transition-transform md:scale-100 scale-0  ' :'scale-x-100 duration-500  ease-out-in delay-100'}       `} >
          <ul className="md:flex md:justify-center ">
          <Link to='/kids'> <li className="p-2 ">Kids</li></Link>
          <Link to='/men'> <li className="p-2 ">Men</li></Link>
          <Link to='/women'> <li className="p-2 ">Women</li></Link>
          </ul>
        </div>
        <div className="flex gap-3 flex-row-reverse md:px-6">
         <h1 className="py-3 md:hidden block " onClick={done}> {icon}   </h1>
         <h1 className="py-3 relative"><div className="rounded-full text-sm bg-white px-1 absolute -top-1 left-2 border border-black">{carts}</div>  <Link to='/addtocard'>  <FaCartShopping/> </Link></h1>
          <h1 className="py-3"> <Link to='/account'> <FaUser/> </Link></h1>

        </div>
       
        </div>
      </nav>
    </div>
  );
};

export default Nav;
