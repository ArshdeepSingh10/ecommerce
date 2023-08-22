import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../action/action';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

// import Addtocartinfo from './Addtocartinfo';

const Product = () => {
const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  const { proid, category } = useParams();
  const dispatch = useDispatch();
  const [show , setShow] =useState(false)
  const [product, setProduct] = useState([]);
  const [quantity , setQuantity] = useState(1)
  const [coverimg, setCoverimg] = useState();
  const [varint , setVarint] = useState([]);
  const [carts , setCarts] = useState([]);
  const gets = async () => {
    try {
      
      const res = await axios.get(`https://backend-pied-phi.vercel.app/${category}/${proid}`);
      const products = res.data;
      const foundProduct = products.find((val) => val._id === proid);
      const othervarient = products.filter((val) => (val.category === foundProduct.category));
      setVarint(othervarient);
      setProduct(foundProduct);
      setCoverimg([foundProduct.image[0]]);
    setIsLoadingProduct(false);
    } catch (err) {
      console.log(err);
     setIsLoadingProduct(false);
    }
  };
const changeimage = (img) =>{
  setCoverimg(img)
}

const change = async(a , b) =>{
  try{
    console.log(a , b);
    const pro =  await varint.find((val) => (val[a] === b));
    setCoverimg([pro.image[0]]);
    console.log(pro);
    setProduct(pro);
    console.log(product);
    const othervarients = await product.find((val) => (val.brand === pro.brand));
    setVarint(othervarients);
  
  }
  catch(err){
    console.log(err);
  }

}

const atc =() =>{
  
  const newCart = [...carts, { ...product, quantity }];
    setCarts(newCart);

    // Set the visibility of the newly added cart item to true
    const updatedVisibilities = [...cartVisibilities];
    updatedVisibilities[newCart.length - 1] = true;
    setCartVisibilities(updatedVisibilities);

    // Dispatch the addToCart action
    dispatch(addToCart({ ...product, quantity }));
  
  

}
const [cartVisibilities, setCartVisibilities] = useState(carts.map(() => false));

  const handleContinueShoppingClick = (index) => {
    // Update the visibility state for the clicked cart item to hide it
    const updatedVisibilities = [...cartVisibilities];
    updatedVisibilities[index] = false;
    setCartVisibilities(updatedVisibilities);
  };
  useEffect(() => {
   
    gets();
  }, []);


  return (
    <div className=''>
  
      <div className='lg:mx-32'>

{/*------------------------------------------ navbar ---------------------------------------------------- */}
      <div className='p-4'>
        <h1>
        Home / Kids / {product.name}
        </h1>
      </div>

{/* ------------------------------------------------ main product card start ------------------------------- */}
{isLoadingProduct ? (
    <div className="flex justify-center items-center h-96">
      <FaSpinner className="animate-spin text-gray-600 w-10 h-10" />
    </div>
  ) : ( 
<div className='grid grid-cols-12 gap-4 '>
        {/*------------------------------- image side ----------------------------- */}
      <div className='col-span-12 md:col-span-6 ' >
   
{/*------------------------------------------ image div ----------------------------------------- */}
<div className='  ' id={product._id}>
<img src= {!product.image ? "": coverimg} alt='nike shoes' className='object-contain' />
<h1></h1>
</div>
<div className='flex pe-32 py-4 gap-5'>
    {!product.image ? " ":  product.image.map((image , index) =>(
        <div key={index}>
        <img src={image} onClick={()=>(changeimage(image))}  className='object-fill' />
    </div>

    ))}
    
  </div>
      </div>
      {/*------------------------------------------- product detail ----------------(----------- */}
      <div className='col-span-12 md:col-span-6 '>
      <div className=' m-5 leading-loose'>
{/*------------------------------------------------ detail ---------------------------------------------------- */}
        <div>
<h1 className='text-3xl text-left'>{product.brand + " " +product.name}</h1>

<h5>${product.price}</h5>
<p className='text-grey-500'>
Sku: {product.sku}
</p>

        {/* </div> */}
        {/* ---------------------------------- input -------------------------------- */}
        <div className='py-2'>
<input className='form-input rounded w-2/12' type='Number' value={quantity}  onChange={(e) => setQuantity(parseInt(e.target.value))} />
        </div>
        {/* ------------------------------ add to card button ------------------------------------------------------- */}
<div className='py-2 '>
    <button className='border-2 bg-white p-1 w-full border-black hover:bg-gray-900 hover:text-white'  onClick={atc}>
        Add To Card
    </button>
</div>
{/* -------------------------------different size ---------------------------------------------------- */}
<div className='py-2 text-sm'>
    <div className='flex py-1 gap-2'>
       {varint.map((val) => ( <div className='border-2 p-1 px-3 rounded'  onClick={()=>(change("size",  val.size))}>
            <h1>{val.size}</h1>
        </div>))}
    </div>
    {/* ----------------------------------- color--------------------- */} 
     <div className='flex py-1 gap-2'>
    {varint.map((val) => ( <div className='border-2 p-1 px-3 rounded' >
            <h1 onClick={()=>(change("color" , val.color))}>{val.color}</h1>
        </div>))}
    </div>
    
</div>
{/*------------------------------------------------- paragraph ---------------------------------------------- */}
<div className='text-lg leading-relaxed'>
<p>
  {product.name}
</p>
</div>

</div>
      </div>



      </div>
                
     <div> 
     { carts.length > 0 && (
             <div className='flex flex-col gap-2 absolute top-0 right-0 z-50 p-3 m-3'>

         {carts.map((val ,index) =>(
            <div  key={index}  className={`${cartVisibilities[index] ? 'block' : 'hidden'}  bg-white border border-black p-4`}>
              <div className='p-3'>
                JUST ADDED TO YOUR CART
                <hr />
              </div>
              <div>
                <table className='border-separate border-spacing-3'>
                  <tbody>
                    <tr>
                      <td>
                        <img
                         src={val.image[0]}
                          className='h-20 rounded-md shadow'
                        />
                      </td>
                      <td>
                        <div className='w-44'>
                          <div className='overflow-hidden'>
                            <div className='truncate' style={{ whiteSpace: 'nowrap' }}>
                             {val.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>Qty</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <button className='p-3 border border-black w-full'>
                  <Link to='/addtocard'>VIEW CART</Link>
                  
                </button>
              </div>
              <div className='p-2'>
                <p className='text-center underline' onClick={() => handleContinueShoppingClick(index)}>
                  Continue shopping
                </p>
              </div>
            </div>
        ))} 
        </div>
     )}
     </div>
     

      </div>)}
      </div>
     
      </div>

  );
}

export default Product
