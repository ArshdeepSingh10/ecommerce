import React, { useState } from "react";

import { FaBars, FaCartShopping, FaUser, FaXmark} from "react-icons/fa6";
import { Link } from "react-router-dom";
const Adminnav = () => {
    const [show , setShow] = useState(true)
  const [icon , setIcone] = useState(<FaBars/>)
  
  const done = () =>{
if(show) {
  setIcone(<FaXmark />);
  
} else {
  setIcone(<FaBars />);
}
setShow(!show);

  }
  return (
    <div className="z-50">
      
      <nav className="">
        <div className="grid grid-cols-3  p-4  border-b ">
        <div className="md:col-span-1 col-span-2 ">
          <Link to='/'><img src="logo.png" alt="imageofshopping" className="h-10" /></Link>  
        </div> 
        <div className="">

         <input type="text" className="form-input w-full rounded"/>
        </div>
        <div className="flex gap-3 flex-row-reverse md:px-6">
         <div className="p-2 px-4 bg-green-500 border-2 border-blue-800 rounded-full">
           <p className="text-lg font-bold">
            A
           </p>
         </div>
        </div>
       
        </div>
      </nav>
    </div>
  )
}

export default Adminnav
