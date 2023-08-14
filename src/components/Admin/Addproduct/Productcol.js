import axios from "axios";
import React, { useEffect, useState } from "react";

const Productcol = () => {
  const [product , setProduct] = useState([]); 
  const [selectedProducts , setSelectedProduct] = useState([]);
  const [selectno , setSelctno] = useState(0);
  const [status, setStatus] = useState('All');
  const [productName, setProductName] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sku, setSku] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [show, setShow] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedProduct(product.map((val) => val._id));
     
    } else {
      setSelectedProduct([]);
      
    }
    setSelctno(selectAll ?0 :product.length);
 
  };
  useEffect(() =>{
    if(selectno > 0)
    setShow(true);
  else
  setShow(false)
  },[selectno])
  const setTheSelectedProduct = (id ,isSelected) =>{

    if (isSelected) {
      setSelectedProduct([...selectedProducts, id]);
      setSelctno((selectno) => selectno + 1)
     
        setShow(true);
     
    } else {
      setSelectedProduct(selectedProducts.filter((productId) => productId._id !== id._id));
      setSelctno((selectno) => selectno - 1)
    }
  }
console.log(selectedProducts);
  const getproduct = async() =>{
   try{
    const res = await axios.get("https://backend-pied-phi.vercel.app/products");
   const products = res.data;
   setProduct(products);
   }
   catch(err){
    console.log(err);
   }

  }
// const getUpdate = async() =>{
  
//   try{
//     const res = await axios.patch("http://localhost:8000/admin/products" , selectedProducts)
//   console.log(res.data);
//   }
//   catch(err){
//     console.log(err);
//   }
// }
const getDeleted = async() =>{
  if (selectedProducts.length === 0) {
    console.log('No products selected.');
    return;
  }

  try {
    const selectedProductIds =selectedProducts.join(',');
    const res = await axios.delete(`http://localhost:8000/admin/products?ids=${selectedProductIds}`);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}
const getDisable = async(status) =>{
  try {
    if (selectedProducts.length === 0) {
      console.log('No products selected.');
      return;
    }

    const selectedProductIds= selectedProducts.join(',');
    const res = await axios.patch(`http://localhost:8000/admin/products?ids=${selectedProductIds}&status=${status}`);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
 
  
}
  useEffect(() =>{
   getproduct(); 
  },[])

  const filterProducts = product.filter((val) => {
    const nameMatch = val.name.toLowerCase().includes(productName.toLowerCase());
    const priceMatch =
      (priceFrom === '' || val.price >= parseFloat(priceFrom)) &&
      (priceTo === '' || val.price <= parseFloat(priceTo));
    const quantityMatch = quantity === '' || val.quantity === parseInt(quantity);
    const skuMatch = val.sku.includes(sku);
    const statusMatch =
      status === 'All' || (status === 'Enabled' && val.status === 'enable') || (status === 'Disabled' && val.status === 'disable');
    return nameMatch && priceMatch && quantityMatch && skuMatch && statusMatch;
  });

  return (
    <div>
    <div className=" bg-gray-100 ">
      <div className="p-14 row-span-full">
           <div className="flex"> 
       <h1 className="py-3 text-xl font-bold">Products</h1>
           </div>


        {/*--------------------------- Addproducts columns---------------------------- */}
        <div className="grid grid-cols-12 gap-4 ">
<div className="bg-white rounded-md shadow col-span-full">
 
        <div className="m-1">
          
        </div>
        <div className="">
          <form className="">
            <table className="w-full table-auto border-separate border-spacing-x-6 border-spacing-3">
             <tr className="border-b">
              <td>
                
              <input type="checkbox" className="p-2 mt-5 form-checkbox rounded-md"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </td>
              
              <td>
                <label for="name" className='text-sm font-bold'> Product Name</label>
                {/* <input type="text" id="name" placeholder="Name" className="w-full form-input rounded-md m-1"/> */}
                <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full form-input rounded-md m-1"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
                
              </td>
              <label for="price" className='text-sm font-bold'>Price</label>
              <td className="flex gap-2">
              
                <tr>
                {/* <input type="text" id="price" placeholder="To" className="w-full form-input rounded-md m-1"/> */}
                <input
              type="number"
              id="price"
              placeholder="To"
              className="w-full form-input rounded-md m-1"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
            />
                </tr>
                <tr>
                <input type="text" id="price" placeholder="From" className="w-full form-input rounded-md m-1"
                 value={priceFrom}
                 onChange={(e) => setPriceFrom(e.target.value)}
                />
              
                </tr>
                </td>
              <td>
              <label for="qty" className='text-sm font-bold'>Qty</label>
                <input type="text" id="qty" className="w-full form-input rounded-md m-1"
                 value={quantity}
                 onChange={(e) => setQuantity(e.target.value)}
                />
                
              </td>
              <td>
              <label for="sku" className='text-sm font-bold'>SKU</label>
                <input type="text" id="sku" className="w-full form-input rounded-md m-1"
                 value={sku}
                 onChange={(e) => setSku(e.target.value)}
                />
                
              </td>
              <td>
              <label className='text-sm font-bold'>Status</label>
            <select
            className="w-full form-input rounded-md m-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
                
              </td>
              
             </tr>
             <tr>
<td colSpan={5} className="p-5" >
  <div className={`flex ${show ?"block" :"hidden"}`}>
    <div className="p-2 border rounded" >
      <p>{selectno}selected</p>
    </div>
    <div className="p-2 border rounded" onClick={()=> (getDisable("disable"))}>
      <p>Disabled</p>
    </div>
    <div className="p-2 border rounded" onClick={()=> (getDisable("enable"))}>
      <p>Enabled</p>
    </div>
    <div className="p-2 border rounded cursor-pointer" onClick={getDeleted}>
      <p>Deleted</p>
    </div>
  </div>
</td></tr>
<tr >
 <td colSpan={6}> <div className="border"></div></td>
</tr>


             {/* -------------------------------------------------------------------------------------------------------- */}
           {/* -----------------------------------Show all Products ---------------------------------------------  */}
            
          {filterProducts.map((val) => (
         <React.Fragment>
            <tr className="border  border-black">
              <td className="">
                
              <input
            
            type="checkbox"
            checked={selectedProducts.includes(val._id) || selectAll}
            onChange={(e) => setTheSelectedProduct(val._id, e.target.checked)}
            className="p-2 mt-5 form-checkbox rounded-md"
          
          />  </td>
              
              <td>
             <div className="flex">
             <img src={val.image[0]} className="w-20 "/>
              <p>{val.name}</p>
             </div>
              </td>
             
              <td className="flex gap-2 text-center" rowSpan={2}>
              
               {val.price}
                </td>
              <td>
             {val.quantity}
              </td>
              <td>
              {val.sku}
              </td>
              <td>
<div className={`${val.status === "disable" ? "bg-green-100": "bg-green-500"} rounded-full h-2`}>
  
  </div>                
              </td>

             </tr>
             <tr >
             <td colSpan={6}> <div className="border"></div></td>
            </tr>
            </React.Fragment>
           ))} 
          
           
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

export default Productcol;
