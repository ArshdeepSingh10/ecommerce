import React from "react";
import { Link, useLocation } from "react-router-dom";

const Countinueshopping = () => {
  
  const location = useLocation();
  const state = location.state;
  return (
    <div className="min-h-[80vh]">
      <div className="md:mx-auto md:px-52 md:container">
        <div >
          <h1>Order #12238</h1>
          <h1>Thank you</h1>
        </div>
        <div className="border-[1px] border-black p-4">
          <p>Customer information</p>
          <table className="w-full">
            <tr className="font-bold">
              <td className="">Contact information</td>
              <td className="">Payment Method</td>
            </tr>
            <tr>
              <td className="">{state.email}</td>
              <td className="">{state.billing}</td>
            </tr>

            {/* ---------------------------------------------- */}

            <tr className="font-bold">
              <td className="">Shopping Address</td>
              <td className="">Billing Address</td>
            </tr>
            <tr>
              <td className="">{state.address}</td>
              <td className="">{state.address}</td>
            </tr>
            <tr>
              <td className="">{state.mobile}</td>
              <td className="">{state.mobile}</td>
            </tr>
            <tr>
              <td className="">{state.pincode}</td>
              <td className="">{state.pincode}</td>
            </tr>
            <tr>
              <td className="">{state.state} , {state.country}</td>
              <td className="">{state.state} , {state.country}</td>
            </tr>
            {/* <tr>
              <td className="">{state.state} }</td>
              <td className="">q1222222222222</td>
            </tr> */}
          </table>
          <div className="flex my-2">
          <Link to='/'>  <button className="p-4 bg-gray-700">
            Continue Shopping
            </button></Link>   
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countinueshopping;
