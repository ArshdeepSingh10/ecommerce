import { Link, useNavigate } from "react-router-dom";
import React from "react";
import {format} from 'date-fns'
import { useState, useEffect } from "react";
import Checkoutsuccess from "./Checkoutsuccess";
import { Country, State } from "country-state-city";

import axios from "axios";

const Checkout = () => {
  const [email , setEmail] = useState("");
  const [carts, setCarts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [delivery, setDelivery] = useState();
  const [totalprice, setTotalprice] = useState(subtotal);
  const [formData, setFormData] = useState({ name: "", mobile: "", address: "", country: "", 
  state: "",city: "",pincode: "",billing: "",delivery: "",items: "", shipping:"nofullfilled" ,totalprice: "",cart:[]
});
  const navigate = useNavigate();
  const get = async() =>{
   try{
    const res = await axios.get("http://localhost:8000/checkout",{
      withCredentials: true,
    })
    if (res.status === 200) {
     
      var dates = format(new Date(),'yyy-MM-dd')
      setEmail(res.data.email);
      setFormData((prevData) => ({
        ...prevData,
        email: res.data.email,
        date : dates,
        cart: JSON.parse(sessionStorage.getItem("cartItems"))
      }));
    } else if (res.status === 401) {
      
      navigate("/login")
    }

   }
   catch(err){
    alert("login first")
    navigate("/login")
    console.log(err);
   }
  }
  useEffect(() =>{
  const cart =   JSON.parse(sessionStorage.getItem("cartItems"))
  if(!cart){
    navigate('/addtocard')
  }
    get();
  },[])
 
// setFormData(formData.email = email);
const [totalItems, setTotalItems] = useState(0);
const [show, setShow] = useState(false);
  // const [shop, setShop] = useState(true);
const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [errors , setErrors] = useState({});
  const hidden = (e) => {
    e.preventDefault();
    setShow(!show);
    // setShop(false);
  };

  const handleDeliveryChange = (e) => {
    const deliveryOption = e.target.id;

    let totalPrice = 0;
    if (deliveryOption === "standard") {
      setDelivery(9.0);
      setTotalprice(9.0 + subtotal);
    } else if (deliveryOption === "express") {
      setDelivery(20.0);
      setTotalprice(20.0 + subtotal);
    }
    // Update the formData with the new total price
    setFormData({
      ...formData,
      delivery: deliveryOption,
      totalprice: totalprice
    });
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // console.log(JSON.stringify(formData) +"  " +"fjgjggjhgjhghjgjhg");
  useEffect(() => {
    const cartData = sessionStorage.getItem("cartItems");
    const carts = JSON.parse(cartData);
    setCarts(carts);
    const subTotal = carts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalprice(subTotal);
    setSubtotal(subTotal);
    const totalItems = carts.reduce(
      (total, product) => total + product.quantity,
      0
    );

    setTotalItems(totalItems);
  }, []);

  const validate = (hiddens) =>{
    const errors = {};
  
    if (!formData.name) {
      errors.name = 'Name is required.';
    }
      if (!formData.mobile) {
        errors.mobile = 'mobile is required.';
      }
      if (!formData.address) {
        errors.address = 'addess is required.';
      }
      //  if (!formData.country) {
      //   errors.country = 'country is required.';
      // }
      // if (!formData.state) {
      //   errors.stete = 'State is required.';}
      if (!formData.city) {
        errors.city = 'city is required.';
      }if (!formData.pincode) {
        errors.pincode = 'pincode is required.';
      }if (!formData.delivery) {
        errors.delivery = 'Shipping Method is required.';
      }
  
      // If there are any errors, set the formErrors state
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        alert();
        return;
      }
      else{
        alert(formData)

  hiddens();
      }
  }
  return (
    <div className="py-4">
      <div className="md:container md:mx-auto lg:px-32 ">
        <div className="p-4">Home / Checkout</div>
        {/*------------------------------------ grid -------------------------------------- */}
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-6 col-span-full w-full p-2">
            <div className="py-4 text-xs">
              <h1>
                Contact information {">"} Shipment {">"} Payment
              </h1>
            </div>

            <div className="">
              {/* <div>
                <h1 className="text-2xl py-2">Contact information</h1>
                <p>
                  Already have an account?{" "}
                  <span className="text-blue-500 ">
                    <Link to="login">Login</Link>
                  </span>
                </p>
              </div> */}
              {/* -----------------------------------------------email input div------------------------------------------- */}
              <div className="border border-black rounded-md">
                <table className="table-auto ">
                  <tr className=" text-center text-lg ">
                    <td className="p-2 font-semibold">Contact</td>
                    <td className="p-2">{email}</td>
                    {/* <td className="w-full text-blue-500 p-2"> change </td> */}
                  </tr>
                </table>
              </div>
            </div>

            <div className={`w-full  ${show ? "hidden" : "block"}`}>
              {/* <table className="table-auto  w-full border-[1px] ">
                <tr className=" text-center text-lg ">
                  <td className="w-full p-2">Contact</td>
                  <td className="w-full p-2"> arshdeep725.199@gmai.com</td>
                  {/* <td className="w-full text-blue-500 p-2"> change </td> */}
              {/* </tr>
              </table>  */}
              {/* ------------------------------------------Shipping Address------------------------------ */}
              <div className="">
                <div>
                  <h1 className="text-2xl py-2">Shipping Address</h1>
                </div>
                <div>
                  <form>
                    <table className="table-auto ">
                      <tr className="">
                        <td className="pe-1">
                          <lable for="firstname">FullName</lable>
                          <input
                            type="text"
                            className="form-input w-full  rounded "
                            placeholder="name"
                            id="firstName"
                            name="name"
                            value={formData.name}
                            onChange={handlechange}
                          />
                         
                        </td>
                        <td className="ps-1">
                          <label for="mobileNumber">Mobile Number</label>
                          <input
                            type="text"
                            className="form-input w-full rounded "
                            placeholder="Mobile NUmber"
                            id="mobileNumber"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handlechange}
                          />
                        </td>
                      </tr>
                      <tr><td>
                      <p className="text-red-500">{errors.name}</p>
                        </td>
                        <td>
                        <p  className="text-red-500">{errors.mobile}</p>
                          </td></tr>
                      <tr>
                        <td colSpan={2} className="py-2">
                          <lable for="Address">Address</lable>
                          <input
                            type="text"
                            className="w-full  rounded"
                            placeholder="Address"
                            id="Address"
                            name="address"
                            value={formData.address}
                            onChange={handlechange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                        <p  className="text-red-500">{errors.address}</p>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="py-2">
                          <label for="city">City</label>

                          <input
                            type="text"
                            className="w-full  rounded"
                            placeholder="City"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handlechange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                        <p  className="text-red-500">{errors.city}</p>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="py-2">
                        <label for="city">Country</label>

<input
  type="text"
  className="w-full  rounded"
  placeholder="country"
  id="country"
  name="country"
  value={formData.country}
  onChange={handlechange}
/>
                          {/* <label htmlFor="country">Country</label>
                          <select
                            id="country"
                            value={selectedCountry}
                            className="form-input  rounded w-full"
                            onChange={(e) => setSelectedCountry(e.target.value)}
                          >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select> */}
                        </td>
                      </tr>
                      <tr>
                        <td>
                        {/* <p  className="text-red-500">{errors.country}</p> */}
                        </td>
                      </tr>
                      <tr className="">
                        <td className=" pe-1 py-2">
                          {/* <label htmlFor="state">State</label>
                          <select
                    id="state"
                    value={selectedState}
                    className="form-input  rounded w-full"
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="">Select State</option>
                    {states?.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select> */}
                   <label for="city">State</label>

<input
  type="text"
  className="w-full  rounded"
  placeholder="State"
  id="state"
  name="state"
  value={formData.state}
  onChange={handlechange}
/>
                        </td>
                        <td className="ps-1 py-2">
                          <label for="lastName">Pincode</label>
                          <input
                            type="text"
                            className="form-input  rounded w-full"
                            placeholder="Postcode"
                            id="Postcode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handlechange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                        <p  className="text-red-500">{errors.state}</p>
                        </td>
                        <td>
                        <p  className="text-red-500">{errors.pincode}</p>
                        </td>
                      </tr>
                    </table>
                  </form>

                  <div>
                    <h1 className="py-2">Shipping Method</h1>
                    <div className="border border-gray-400 rounded px-2 py-4">
                      <p>
                        <label
                          htmlFor="standard"
                          className="w-full cursor-pointer"
                        >
                          <input
                            type="radio"
                            id="standard"
                            name="delivery"
                            checked={formData.delivery === "standard"}
                            onChange={handleDeliveryChange}
                          />
                          Standard Delivery - $9.00
                        </label>
                      </p>
                      
                      <p>
                        <label
                          htmlFor="express"
                          className="w-full cursor-pointer"
                        >
                          <input
                            type="radio"
                            id="express"
                            name="delivery"
                            checked={formData.delivery === "express"}
                            onChange={handleDeliveryChange}
                          />
                          Express Delivery - $20.00
                        </label>
                      </p>
                    </div>
                    <td>
                        <p  className="text-red-500">{errors.delivery}</p>
                        </td>
                  </div>
                  <div className="flex flex-row-reverse">
                    <buttom
                      className="p-4 my-2 text-white cursor-pointer hover:bg-green-600 bg-gray-700"
                      onClick={(e) => validate(() =>(hidden(e)))}
                    >
                      Continue Shopping
                    </buttom>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className={`${show ? "block" : "hidden"}`}>
              <div>
                <table className="table-auto border-[1px] ">
                  <tr className=" text-center text-lg ">
                    <td className=" p-2">Address</td>
                    <td className="p-2 w-full">
                      {formData.address + "," + formData.mobile}
                    </td>
                    <td className="w-full text-blue-500 p-2" onClick={hidden}>
                      {" "}
                      change{" "}
                    </td>
                  </tr>
                </table>
              </div>
              <Checkoutsuccess formData={formData} />
            </div>
          </div>
          <div className="md:col-span-6 p-2  md:block bg-gray-50 ">
            <table className="table-auto w-full">
              {carts.map((val) => (
                <React.Fragment key={val._id}>
                  <tr className="w-full">
                    <td>
                      <div className="flex">
                        <div className="relative">
                          <div className="absolute -top-2 -right-2 ">
                            <h1 className="px-1 bg-gray-400 rounded-full">
                              {val.quantity}
                            </h1>
                          </div>
                          <img
                            src={val.image[0]}
                            className="object-fill  w-full h-24 border-2 border-gray-500 rounded"
                          />
                        </div>
                        <div className="p-2 text-sm">
                          <h1>{val.brand}</h1>
                          <p>Color: {val.color}</p>
                          <p>Size: {val.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className=" ">${val.price}</td>
                  </tr>
                </React.Fragment>
              ))}

              <hr />
              <tr>
                <td>Sub Total</td>

                <td>{totalItems}items</td>
                <td>${subtotal}</td>
              </tr>
              <tr>
                <td colSpan={2}>{delivery == 20.0 ? "Express" : "Standard"}</td>

                <td>{delivery}</td>
              </tr>
              <tr>
                <td colSpan={2}>Discount</td>

                <td>0</td>
              </tr>
              <center>
                {" "}
                <hr className="w-full" />
              </center>
              <tr className="text-lg font-bold">
                <td colSpan={2}>TOTAL</td>

                <td>${totalprice}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
