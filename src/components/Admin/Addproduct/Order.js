
import axios from "axios";
import React, { useEffect, useState } from "react";
const Order = () => {
  
   const [order, setOrder] = useState([]);
   const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectno, setSelctno] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingStatus, setShippingStatus] = useState('All');
  const [paymentStatus, setPaymentStatus] = useState('All');
  const [totalFrom, setTotalFrom] = useState('');
  const [totalTo, setTotalTo] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [show, setShow] = useState(false);
  // Toggle the selection of all orders
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedProducts(order.map((val) => val._id));
    } else {
      setSelectedProducts([]);
    }
    setSelctno(selectAll ? 0 : order.length);
  };
  
  const setTheSelectedProduct = (id, isSelected) => {
    if (isSelected) {
      setSelectedProducts([...selectedProducts, id]);
      setSelctno((selectno) => selectno + 1);
    } else {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id));
      setSelctno((selectno) => selectno - 1);
    }
  };
  useEffect(() =>{
    if(selectno > 0)
    setShow(true);
  else
  setShow(false)
  },[selectno])
  console.log(selectedProducts);
    const getorder = async() =>{
     try{
      const res = await axios.get("http://localhost:8000/admin/order");
     const orders = res.data;
     console.log(orders);
     setOrder(orders);
     }
     catch(err){
      console.log(err);
     }
  
    }
 
  
    useEffect(() =>{
     getorder(); 
    },[])
  // const filterOrders =""
     const filterOrders =  order.filter((val) => {
   
    const dateMatch =
      (dateFrom === '' || new Date(val.date) >= new Date(dateFrom)) &&
      (dateTo === '' || new Date(val.date) <= new Date(dateTo));
      const customerEmailMatch =
      (!customerEmail || val.email.toLowerCase().includes(customerEmail.toLowerCase()));    const paymentStatusMatch =
    paymentStatus === "All" ||
    (paymentStatus === "paid" && val.billing === "paid") ||
    (paymentStatus === "pending" && val.billing === "pending");
    const shippingStatusMatch =
    shippingStatus === "All" ||
    (shippingStatus === "fullfilled" && val.shipping === "fullfilled") ||
    (shippingStatus === "nofullfilled" && val.shipping === "nofullfilled");
      const totalMatch =
      (totalFrom === '' || val.totalprice >= parseFloat(totalFrom)) &&
      (totalTo === '' || val.totalprice <= parseFloat(totalTo));
      return (
     
      dateMatch &&
      customerEmailMatch &&
    
      paymentStatusMatch &&
      totalMatch &&
      shippingStatusMatch
    );
  });
  const getUpdate = async (status) => {
    try {
      if (selectedProducts.length === 0) {
        console.log('No products selected.');
        return;
      }
  
      const selectedOrderIds = selectedProducts.join(',');
      const res = await axios.patch(`http://localhost:8000/admin/order?ids=${selectedOrderIds}&status=${status}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  
  return (
    <div>
    <div className=" bg-gray-100 ">
      <div className="p-14 row-span-full">
           <div className="flex"> 
       <h1 className="py-3 text-xl font-bold">Orders</h1>
           </div>


        {/*--------------------------- Addproducts columns---------------------------- */}
        <div className="grid grid-cols-12 gap-4 ">
<div className="bg-white rounded-md shadow col-span-full">
 
        <div className="m-1">
          
        </div>
        <div className="">
          <form className="">
            <table className="w-full table-auto border-separate border-spacing-x-6 border-spacing-3">
            <tbody>
             <tr className="border-b">
              <td>
                
                <input type="checkbox" className="p-2 mt-5 form-checkbox rounded-md"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </td>
              
              <td>
                <label for="name" className="text-sm font-bold"> Order Number</label>
                <input
              type="text"
              id="name"
              placeholder="Order Number"
              className="w-full form-input rounded-md m-1"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
                
              </td>
              <label for="date"  className="text-sm font-bold">Date</label>
              <td className="flex gap-2">
              
                <tr>
                {/* <input type="text" id="price" placeholder="To" className="w-full form-input rounded-md m-1"/> */}
              <input
              type="text"
              id="date"
              placeholder="From"
              className="w-full form-input rounded-md m-1"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
                </tr>
                <tr>
                {/* <input type="text" id="price" placeholder="From" className="w-full form-input rounded-md m-1"/> */}
              <input
              type="text"
              id="date"
              placeholder="To"
              className="w-full form-input rounded-md m-1"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
                </tr>
                </td>
              <td>
              <label for="qty" className="text-sm font-bold"> Customer Email</label>
                {/* <input type="text" id="qty" className="w-full form-input rounded-md m-1"/> */}
                <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full form-input rounded-md m-1"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
              </td>
             
              <td>
               <label  className="text-sm font-bold">Shipping Status</label>
            <select
              value={shippingStatus}
              onChange={(e) => setShippingStatus(e.target.value)}
              className="rounded-md"
            >
              <option value="All">All</option>
              <option value="fullfilled">fullfilled</option>
              <option value="nofullfilled">nofullfilled</option>
            </select>
                
              </td>
<td>
<label  className="text-sm font-bold">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="rounded-md"
            >
              <option value="All">All</option>
              <option value="paid">Paid</option>
              <option value="pending">pending</option>
            </select>
</td>

              <label for="price"  className="text-sm font-bold">Total</label>
              <td className="flex gap-2">
              
                <tr>
              <input
              type="text"
              id="price"
              placeholder="To"
              className="w-full form-input rounded-md m-1"
              value={totalTo}
              onChange={(e) => setTotalTo(e.target.value)}
            />
                </tr>
                <tr>
              <input
              type="text"
              id="name"
              placeholder="From"
              className="w-full form-input rounded-md m-1"
              value={totalFrom}
              onChange={(e) => setTotalFrom(e.target.value)}
            />
                </tr>
                </td>
             </tr>
             <tr>
<td colSpan={6} className="p-5" >
  <div className={`flex ${show ?"block" :"hidden"}`}>
    <div className="p-2 border rounded" >
      <p>{selectno}selected</p>
    </div>
    <div className="p-2 border rounded cursor-pointer" onClick={() =>(getUpdate("fullfilled"))}>
      <p>Mark as fullfilled</p>
    </div>
  </div>
</td></tr>
<tr >
 <td colSpan={7}> <div className="border"></div></td>
</tr>


             {/* -------------------------------------------------------------------------------------------------------- */}
           {/* -----------------------------------Show all Products ---------------------------------------------  */}
            
          {filterOrders?.map((val) => (
         <React.Fragment  key={val._id}>
            <tr className="border  border-black text-justify ">
              <td className="">
                
              <input
                    type="checkbox"
                    checked={selectedProducts.includes(val._id) || selectAll}
                    onChange={(e) => setTheSelectedProduct(val._id, e.target.checked)}
                    className="p-2 mt-5 form-checkbox rounded-md"
                  /> </td>
              
              <td>
      
             <p >{val.name}</p> 
              
           
              </td>
             
              <td className="flex gap-2 text-center" rowSpan={2}>
              
               {val.date}
                </td>
              <td>
             {val.email} 
              </td>
              <td className="text-center">
              <span className={`${val.shipping ==="fullfilled" ? "bg-green-300" :"bg-orange-300 "}  rounded-full text-center p-1 px-3`}>
            <span className="text-lg" >o</span>  {val.shipping}
              </span>
              </td>
              <td>
              <span className={`${val.billing ==="paid" ? "bg-green-300" :"bg-gray-300 "}  rounded-full text-center p-1 px-3`}>
            <span className="text-gray-600 text-lg" >o</span> {val.billing}
              </span>
              </td>
<td>
{val.totalprice}
</td>
             </tr>
             <tr >
             <td colSpan={7}> <div className="border"></div></td>
            </tr>
            </React.Fragment>
           ))} 
          
          </tbody>
            </table>
            
          </form>
        </div>
      </div>{/*general */}
      </div>
      </div>
      </div>
      </div>

  );
};

export default Order;
