import React, { useState } from "react";
 import axios from "axios";
 import { FaArrowLeft, FaCamera,  FaXmark} from "react-icons/fa6";
const Addproducts = () => {
  const [brand , setBrand] = useState("");
  const [name , setName] = useState("");

  const [price , setPrice] = useState();
  const [quantity ,setQuantity] = useState(0);
  const [category , setCategory] = useState("");
  const [image , setImage] = useState([]);

  const [size , setSize] = useState("");
  const [color , setColor] = useState("");
 
  const [sku , setSku] = useState();
  const [error , setError] = useState({});
 
  const formsubmit = async (e) =>{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);

    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
     formData.append("sku", sku);
    for (let i = 0; i < image.length; i++) {
      formData.append("image",image[i]);

      console.log(image[i]);
    }
    formData.append("color", color);
    formData.append("size", size);
    formData.append("status", "enable");
console.log(formData);
console.log(image);
   
    try{
   

       await axios.post("https://backend-pied-phi.vercel.app/admin",formData);
alert("is add")
    }
    catch(error){
      console.log(error);
    }

  }  


  const validate = (formSubmitCallback) =>{
  const errors = {};

  if (!name) {
    errors.name = 'Name is required.';
  }
    if (!brand) {
      errors.brand = 'brand is required.';
    }
    if (!price) {
      errors.price = 'price is required.';
    }
     if (!quantity) {
      errors.quantity = 'quantity is required.';
    }
    if (!category) {
      errors.category = 'category is required.';
    }if (image.length === 0) {
      errors.image = 'image is required.';
    }if (!size) {
      errors.size = 'Size is required.';
    }if (!color) {
      errors.color = 'Color is required.';
    }

    // If there are any errors, set the formErrors state
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    else{
      setSku(brand+"_"+size+"_"+color)
formSubmitCallback()
    }
}

  const handleimage = (e) => {
    const selected = Array.from(e.target.files);
    setImage(selected);
    console.log(image);
  }


 
  return (
    <div>
   
<div className=" bg-gray-100 w-full">

      <div className="p-14 row-span-full">
           <div className="flex"> 
       <button className="p-2 m-2 rounded border-[1px] border-black hover:bg-white bg-gray-200"><FaArrowLeft/></button><h1 className="py-3">Create A New Product</h1>
           </div>


        {/*--------------------------- Addproducts columns---------------------------- */}
        <div className="grid grid-cols-12 gap-4 ">
<div className="bg-white rounded-md shadow col-span-12 md:col-span-8">
 
        <div className="m-1">
          <p className="p-3 font-bold">General</p>
        </div>
        <div className="">
          <form className="">
            <table className="w-full border-separate border-spacing-x-8">
              <tr className="m-1">
                <td className=" py-2" colSpan={3}>
                  <label for="name">Name</label>
                  <input type="text" id="name" className="w-full rounded-md" value={name} onChange={(e) => {setName(e.target.value)}} />
                  <span className="text-red-600 flex items-center">
  <div className={`p-1 w-6 text-md m-1 rounded-full text-white bg-red-600 ${!error.name ? 'hidden': 'block'}`} >
    <FaXmark />
  </div>
                    {error.name}
                  </span>
                </td>
              </tr>
              {/* --------------------------------------------------------  */}
              <tr className="m-1">
                <td className=" py-2">
                <label for="sku">SKU</label>
                <input type="text" id="sku" className="w-full rounded-md"  value={sku} required/> 
                </td>
                {/* ============== */}
                <td className=" py-2">
                <label for="price">Price</label>
                <input type="number" id="price" className="w-full rounded-md" value={price} onChange={(e) => {setPrice(e.target.value)}} required/> 
                
                </td>
                {/* ================== */}
                 <td className=" py-2">
                <label for="quantity">Quantity</label>
                <input type="number" id="quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} className="w-full rounded-md" required/> 
                </td>
                
              </tr>
              <tr>
              <td></td>
                <td> <span className="text-red-600 flex items-center"><div className={`p-1 w-6 text-md m-1 rounded-full text-white bg-red-600 ${!error.price ? 'hidden': 'block'}`} ><FaXmark /> </div> {error.price}</span></td>
                <td><span className="text-red-600 flex items-center"><div className={`p-1 w-6 text-md m-1 rounded-full text-white bg-red-600 ${!error.quantity ? 'hidden': 'block'}`} ><FaXmark /></div> {error.quantity}</span></td>
              
              </tr>
              {/* -----------------------------------------------------  */}
<tr className=""><td className=" " colSpan={3}> <p className="p-2">Category</p></td></tr>
   <tr className="bg-gray-200">
   <td colSpan={3} className="rounded-md p-2">
   <tr><td><input type="radio" value={'kids'} checked={category === 'kids'} onChange={(e) => {setCategory(e.target.value)}} id="kid"/><label for="kid">kids</label></td></tr>
   <tr><td><input type="radio" value={'men'} checked={category === 'men'} onChange={(e) => {setCategory(e.target.value)}} id="men"/><label for="men">Men</label></td></tr>
   <tr><td><input type="radio" value={'women'} checked={category === 'women'} onChange={(e) => {setCategory(e.target.value)}} id="women"/><label for="women">Women</label></td></tr>
   <tr>
    <td>
      <span className="text-red-600 flex items-center">
  <div className={`p-1 w-6 text-md m-1 rounded-full text-white bg-red-600 ${!error.category ? 'hidden': 'block'}`} >
    <FaXmark />
  </div>
                    {error.category}
                  </span>
    </td>
   </tr>
   </td>
   </tr>
{/* ---------------------------------------------------------  */}
<tr className="m-1">
    
    <td colSpan={3} className=" py-2 ">
    <p className="p-2">  Media</p>
    <div className="m-3">
    
    <label  className="" >
<span className="text-xl cursor-pointer" >
<FaCamera/>

</span>
        <input type="file" name="file_upload" onChange={handleimage} multiple className="hidden"/>
    </label>
    
</div>

<div className="flex flex-wrap gap-2  "> 
{image.map((im , index) => (

<img src={URL.createObjectURL(im)} key={index} alt="Uploaded Image" className=" shadow-lg rounded-md w-32 h-28 object-fill" />

   ) )} 
   </div>
   <span className="text-red-600 flex items-center">
  <div className={`p-1 w-6 text-md m-1 rounded-full text-white bg-red-600 ${!error.image ? 'hidden': 'block'}`} >
    <FaXmark />
  </div>
                    {error.image}
                  </span>
</td>
  
</tr>
<tr>
  <td className="w-full " colSpan={3}>

              <button className="bg-gray-500 hover:bg-green-500 p-2 rounded-md w-full my-3" onClick={(e) => validate(() => formsubmit(e))}>
                Done
              </button>
            
  </td>
</tr>
            </table>
            
          </form>
        </div>
      </div>{/*general */}
      <div className=" col-span-12 md:col-span-4">
{/* ====================================== */}

<div className="bg-white p-5 rounded-md w-full mb-2">
  <div>
  <p className="font-bold">Product status</p>
  </div>
<div className="py-4">
<p className="text-md">
  Status
</p>
<div className="py-2"><input type="radio" id="status"/><label for="status">Disabled</label></div>
<div className="py-2"><input type="radio" id="status"/><label for="status">Enabled</label></div>
</div>
</div>

{/* ==================================== */}
{/* ====================================== */}
<div className="bg-white p-5 rounded-md w-full mb-2 relative">
  <div>
  <p className="font-bold">ATTRIBUTES</p>
  </div>
<div className="py-4">
<table className="border-collapse border  table-auto">
  <tr>
    <td className="border p-2"><label for="size">Size</label></td>
    <td className="border">
      

<select name="size" id="size" className="w-full rounded-md form-select" value={size} onChange={(e) => setSize(e.target.value)} >

<option value="null">select the size</option>
<option value="S">Small</option>
<option value="M">Medium</option>
<option value="L">Large</option>

</select>
<span className="text-red-600 flex items-center">
  <div className={`p-1 w-6 text-md m-1 rounded-full text-white bg-red-600 ${!error.size ? 'hidden': 'block'}`} >
    <FaXmark />
  </div>{error.size}</span>
</td>
  </tr>
  <tr>
    <td className="border p-2"><label for="color">Color</label></td>
    <td className="border">
      <select name="color" id="color" className="w-full rounded-md form-select" value={color} onChange={(e) => setColor(e.target.value)} >

<option value="null">select color</option>
<option value="black">Black</option>
<option value="white">White</option>
<option value="blue" >Blue</option>
<option value="pink">Pink</option>
<option value="red" >Red</option>
</select>
<span className="text-red-600 flex items-center">
  <div className={`p-1 w-6 text-md m-1 rounded-full text-white bg-red-600 ${!error.color ? 'hidden': 'block'}`} >
    <FaXmark />
  </div>
  {error.color}
</span></td>
  </tr>
  <tr>
    <td className="border p-2">Brand</td>
    <td className="border"><input type="text" placeholder="enter brand name " value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full form-input rounded-md"/></td>
  
  </tr>
  <tr>

  <td><span className="text-red-600 flex items-center"><div className={`p-1 w-6 text-md m-1 rounded-full text-white bg-red-600 ${!error.brand ? 'hidden': 'block'}`} ><FaXmark /></div> {error.brand}</span></td>

  </tr>
</table>
</div>


</div>

{/* ==================================== */}
</div>
      </div>
      </div>
      
      </div>    {/* main  */}
    </div>

  );
};

export default Addproducts;
