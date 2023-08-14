import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { removeFromCart } from '../action/action';
import { useEffect } from 'react';
const Addtocard = () => {
const dispatch = useDispatch();
const [cart , setCart] = useState([]);
useEffect(() => {
    const cartData = sessionStorage.getItem('cartItems');
    const carts = JSON.parse(cartData);
    setCart(carts); 
  }, []);  
   
    const subtotal = cart?.reduce((total, product) => total + (product.price * product.quantity), 0);
    console.log(cart + " " +" fhfhfhgf");  
    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
        setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
      };
  return ( 
    <div className='md:container md:mx-auto lg:px-14 h-[100vh]'>
      <div className='p-2'>
<h1>
    Home/Shopping Card
</h1>
      </div> 
      {cart === null || cart.length === 0  ? (<div className='flex justify-center'>
       <Link to='/'> <div className='text-white bg-black p-2 m-4'>
          Countinue Shopping 
        </div></Link>
      </div>) : (
<div className='grid grid-rows-full grid-flow-col gap-4 p-2 '>
    <div className='md:col-span-9 col-span-full p-4 '>
   
       <table className=' w-full '>
     
         <tr>
            <td>
            PRODUCT
            </td>
            <td>
            PRICE
            </td>
            <td>
           <p className='md:block hidden'> QUANTITY</p>
            </td>
            <td>
            <p className='md:block hidden'> PRICE</p>
            </td>
        </tr>
        {cart.map((product)=>
        ( <tr className='border-t-2 border-b-2 border-black'>
            <td>
          <div className='flex'>
            <div className='' id={product._id}>
                <img src={product.image[0]} className='object-scale-down h-32'/>
            </div>
            <div className='p-2'>
                <h1>
            {product.brand}
           
                </h1>
                <p>
                Color: Pink
                </p>
                <p>
                    Size: L
                </p>
                <a className='text-md   text-gray-500 underline'onClick={() => handleRemoveFromCart(product._id)}>
                    Remove
                </a>
            </div>
          </div>
            </td>
            <td>
            ${product.price}
            <p className='md:hidden block'>
                Qty:1
            </p>
            </td>
            <td>
            <p className='md:block hidden'>{product.quantity}</p>
            </td>
            <td>
            <p className='md:block hidden'>${product.price * product.quantity}</p>
          
            </td>
        </tr>))}
        </table>
   
    <div className='py-6'>
        <h1 className='font-bold'>Promotion code?</h1>
        <div>
            <input type='text' className='form-input rounded' />
            <button className='bg-gray-700 text-white p-3 rounded m-2'>Apply</button>
        </div>
    </div>
    </div>
    <div className='md:col-span-3 col-span-full w-full '>
        <h1 className='text-2xl  pb-2'>
            Order summary
        </h1>
        <div className='p-2 '>
        <table className='table-auto w-full text-sm '>
            <tr>
                <td className='text-left'>
                    Sub Total
                </td>
                <td className='text-right'>
                   
                    <h1>
                        {subtotal}
                    </h1>
                 
                    </td>
            </tr>
        </table>
        </div>
        <p className='text-sm p-2'>
        Taxes and shipping calculated at checkout
        </p>
        {/*-------------------------------------------- button -------------------------------------- */}
<div>

   
    <button className='text-white bg-gray-800 p-2 text-sm rounded '>
        <Link to="/checkout">CHECKOUT</Link> 
    </button>
</div> 
    </div>
</div>)  } 
    </div>
  )
}

export default Addtocard
