import React from "react";
import { Link } from "react-router-dom";
import { useState ,useEffect } from "react";
import axios from "axios";
const Checkoutsuccess = ({ formData }) => {
console.log(formData);

  const [billingMethod, setBillingMethod] = useState("pending");
  const [formDatas, setFormDatas] = useState();
  // const { name, mobile, address, country, state, city, pincode } = formData;

const formsubmit = async() =>{
 sessionStorage.clear('cartItems');

  const res =  await axios.post("https://backend-pied-phi.vercel.app/checkout",formDatas);
  console.log(res);
}
  const handleBillingMethodChange = (e) => {
    setBillingMethod(e.target.id);

    if (e.target.checked) {
  setFormDatas(formData); 

      // If the billing address is the same as the shipping address, set the billing field to null
      setFormDatas((prevFormData) => ({ ...prevFormData, billing: billingMethod }));
console.log(billingMethod);
    } else {
      // If the billing address is not the same as the shipping address, you can clear the billing address from the formData
      setFormDatas((prevFormData) => ({ ...prevFormData, billing: null }));
    }
  };
console.log(formDatas);
  // const { name, mobile, address, country, state, city, pincode, delivery, items, totalprice } = formData;
  useEffect(()=>{
    setFormDatas((prevFormData) => ({ ...prevFormData, billing: billingMethod }));
  },[billingMethod])
  return (
    <div>
      <div>
        <div>
          <h1 className="py-4">Billing Address</h1>
          <div>
            <input type="checkbox" />
            My billing address is same as shipping address
          </div>
          <div>
            <p className="py-4">Payment Method</p>
            <div className="border border-gray-700 p-4">
              <p className="flex gap-4 m-2">
                <input
                  type="radio"
                  name="pay"
                  className="my-5"
                  id="pending"
                  checked={billingMethod ==='pending'}
                  onChange={(e) => handleBillingMethodChange(e)}
                />{" "}
                <label for="cashondelivery">
                  <img src="cash-on-delivery.png" className="h-14 w-full" />
                </label>
              </p>
              <hr />
              <p className="flex gap-4 m-2">
                <input
                  type="radio"
                  name="pay"
                  className="my-5"
                  id="paid"
                  checked={billingMethod === 'paid'}
                  onChange={(e) => handleBillingMethodChange(e)}
                />
                <label for="upi">
                  <span className="text-3xl text-blue-700 ">
                    <img src="paytm.png" className="h-14 w-full" />
                  </span>
                </label>
              </p>
              <hr />
             
            </div>
            <div>
              <button className="p-4 my-2 bg-slate-800 text-white hover:bg-green-700 " onClick={formsubmit}>
                <Link to="/checkout/contiueshoping" state ={formDatas}
                >
                  Place Order
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkoutsuccess;
