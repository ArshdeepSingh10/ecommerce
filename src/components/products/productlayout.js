import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { fetchProducts } from '../action/action';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from 'react';

import Fuse from 'fuse.js';

const Productlayout = () => {
 const fuseOptions = {
  keys: ['name', 'brand', 'color', 'size'], // Specify the fields to search
  threshold: 0.4, // Adjust the threshold as needed
};
  const [searchQuery, setSearchQuery] = useState("");

  
  const { category } = useParams();
  const [barshow, setBarshow] = useState(true);
  const allProducts = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    color: [],
    size: [],
    price: { min: '', max: '' },
  });
  
  const [sortBy, setSortBy] = useState("none");

  const products = allProducts.filter((product) => product.category === category && product.status ==="enable");
  const fuse = new Fuse(products, fuseOptions);
  
 
  
  const filteredProducts = products.filter((product) => {
    const brandFilter = selectedFilters.brand.length === 0 || selectedFilters.brand.includes(product.brand.toLowerCase());
    const colorFilter = selectedFilters.color.length === 0 || selectedFilters.color.includes(product.color.toLowerCase());
    const sizeFilter = selectedFilters.size.length === 0 || selectedFilters.size.includes(product.size.toLowerCase());

    const minPrice = selectedFilters.price.min !== '' ? parseFloat(selectedFilters.price.min) : Number.NEGATIVE_INFINITY;
    const maxPrice = selectedFilters.price.max !== '' ? parseFloat(selectedFilters.price.max) : Number.POSITIVE_INFINITY;

    // Ensure that priceFilter is set to true only if the product's price is within the min and max range
    const priceFilter = (isNaN(minPrice) || product.price >= minPrice) && (isNaN(maxPrice) || product.price <= maxPrice);

    return brandFilter && colorFilter && sizeFilter && priceFilter;
  });
  

  const sortedProducts = [...filteredProducts];
  if (sortBy === "price") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "name") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleFilter = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const selectedValues = prevFilters[filterType];
      if (filterType === 'price') {
        return {
          ...prevFilters,
          price: {
            min: value.min !== '' ? parseFloat(value.min) : '',
            max: value.max !== '' ? parseFloat(value.max) : '',
          },
        };
      }
      if (selectedValues.includes(value)) {
        return { ...prevFilters, [filterType]: selectedValues.filter(v => v !== value) };
      } else {
        return { ...prevFilters, [filterType]: [...selectedValues, value] };
      }
    });
  };
 
  const handleSearch = () => {
    const keywords = searchQuery.toLowerCase().split(' ');
  
    const filteredByFilters = products.filter((product) => {
      const brandFilter =
        selectedFilters.brand.length === 0 ||
        selectedFilters.brand.includes(product.brand.toLowerCase());
      const colorFilter =
        selectedFilters.color.length === 0 ||
        selectedFilters.color.includes(product.color.toLowerCase());
      const sizeFilter =
        selectedFilters.size.length === 0 ||
        selectedFilters.size.includes(product.size.toLowerCase());
  
      const productName = product.name.toLowerCase();
  
      // Check if any keyword matches brand, color, size, or product name
      return (
        brandFilter &&
        colorFilter &&
        sizeFilter &&
        keywords.every((keyword) => {
          return (
            product.brand.toLowerCase().includes(keyword) ||
            product.color.toLowerCase().includes(keyword) ||
            product.size.toLowerCase().includes(keyword) ||
            productName.includes(keyword)
          );
        })
      );
    });
  
    return filteredByFilters;
  };
 
  

  
  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [category]);

  const show = handleSearch().map((val) => (
    <>
      <div  className="animate-pulse shadow-lg px-4 py-2 rounded-lg">
        {/* Image */}
        <div className="shadow-sm">
          <img
            src={val.image[0]}
            className="object-cover"
            alt="nike image"
          />
        </div>
        {/* Description */}
        <div>
          <Link to={`/${category}/${val._id}`}><h1 className="text-sm md:text-lg font-semibold">{val.brand + " " + val.name}</h1></Link>
          <p>₹{val.price}</p>
        </div>
      </div>
    </>
  ));

  const showFilter = () => {
    setBarshow(!barshow);
  };

 


  return (
    <div className=" bg-slate-50">
      {/*------------------------------------- filter button ----------------------------- */}
      <div className="fixed text-xl md:hidden block z-10 text-white p-4 right-0 bottom-1/3"> 
      <div className=" bg-blue-500 shadow-lg p-3 rounded-full" onClick={showFilter} type="button">
      <FaFilter />
      </div>
     

      </div>
      {/* ---------------------------------------------- filter button -------------------------------------- */}
      <div className="lg:mx-24 bg-white">
        <div className="h-10 shadow-lg flex gap-3">
          <p className="p-2">Home/KIDS</p>
          <input
  type="text"
  className="rounded form-input"
  placeholder="Search products..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }}
/>
        </div>
        <div className="shadow   bg-center bg-cover  p-2 flex justify-center" style={{ backgroundImage: `url(menbanner.jpg)`}}>
          <div className="border-2 border-black  md:text-8xl text-4xl bg-white text-black text-center shadow-lg  font-bold " ><h1 className="p-2">  {category.toUpperCase()}</h1>
          
        </div>
        </div>

        <div className="grid md:grid-rows-full grid-flow-col gap-4 ">
          {/* filter */}
          <div className={`fixed ${barshow ? 'hidden md:block' : 'block'}  top-0 md:relative md:w-[200px] w-full bg-white`} id="sidebar">
          <div className="sticky top-20">
            <h1 className="p-2 font-bold">SORT BY</h1>
            {/* range  */}
        {/* range */}

           
             {/* brand */}
            <div className="p-2 w-full ">
              <h1>BRAND</h1>
              <hr className="w-full" />
              <div>
                <input
                  type="checkbox"
                  id="asian"
                  value="asian"
                  className="form-checkbox rounded "
                  checked={selectedFilters.brand.includes("asian")}
                  onChange={(e) => handleFilter("brand", e.target.value)}
                />
                <label for="nike">Asian</label>
                <br />
                <input
                  type="checkbox"
                  id="nike"
                  value="hero"
                  className="form-checkbox rounded"
                  checked={selectedFilters.brand.includes("hero")}
                  onChange={(e) => handleFilter("brand", e.target.value)}
                />{" "}
                <label for="hero"> Hero</label>
              </div>
            </div>
            {/* -----------------------------------------color ---------------------------------------------------------------------------------------------------- */}
            <div className="p-2 w-full">
              <h1>COLOR</h1>
              <hr className="w-full" />
              <div>
              <input
  type="checkbox"
  id="white"
  value="white"
  className="form-checkbox rounded"
  checked={selectedFilters.color.includes("white")}
  onChange={(e) => handleFilter("color", e.target.value)}
/>
                <label for="white"> White</label>
                <br />
                <input
  type="checkbox"
  id="black"
  value="black"
  className="form-checkbox rounded"
  checked={selectedFilters.color.includes("black")}
  onChange={(e) => handleFilter("color", e.target.value)}
/>{" "}
                <label for="black">Black</label>
                <br />
                <input
                  type="checkbox"
                  id=""
                  value="brown"
                  className="form-checkbox rounded"
                  checked={selectedFilters.color.includes("brown")}

                  onChange={(e) => handleFilter("color", e.target.value)}
                />
                <label for="brown"> Brown</label>
                <br />
                <input
                  type="checkbox"
                  id=""
                  value="pink"
                  className="form-checkbox rounded"
                  checked={selectedFilters.color.includes("pink")}

                  onChange={(e) => handleFilter("color", e.target.value)}
                />{" "}
                <label for="pink">Pink</label>
                <br />
                <input
                  type="checkbox"
                  id=""
                  value="grey"
                  className="form-checkbox rounded"
                  checked={selectedFilters.color.includes("grey")}


                  onChange={(e) => handleFilter("color", e.target.value)}
                />
                <label for="grey"> Grey</label>
                <br />
                <input
                  type="checkbox"
                  id=""
                  value="green"
                  className="form-checkbox rounded"
                  checked={selectedFilters.color.includes("green")}
                

                  onChange={(e) => handleFilter("color", e.target.value)}
                />{" "}
                <label for="green">Green</label>
                <br />
                <input
                  type="checkbox"
                  id=""
                  value="yellow"
                  className="form-checkbox rounded"
                  checked={selectedFilters.color.includes("yellow")}
                  
                  onChange={(e) => handleFilter("color", e.target.value)}
                />
                <label for="yellow"> Yellow</label>
              </div>
            </div>
            {/* ---------------------------------------------------size ------------------------------------------------------------------------------ */}
            <div className="p-2 w-full">
              <h1>SIZES</h1>
              <hr className="w-full" />
              <div>
                <input
                  type="checkbox"
                  id=""
                  value="s"
                  className="form-checkbox rounded"
                  checked={selectedFilters.size.includes("s")}

                  onChange={(e) => handleFilter("size", e.target.value)}
                /><label for="s"> S</label>
                <br />
                <input
                  type="checkbox"
                  id=""
                  value="l"
                  className="form-checkbox rounded"
                  checked={selectedFilters.size.includes("l")}


                  onChange={(e) => handleFilter("size", e.target.value)}
                /><label for="l"> L</label>
                <br />
                <input
                  type="checkbox"
                  id=""
                  value="m"
                  className="form-checkbox rounded"
                  checked={selectedFilters.size.includes("m")}

                  onChange={(e) => handleFilter("size", e.target.value)}
                /><label for="m"> M</label>
                <br />
                <input
                  type="checkbox"
                  id=""
                  value="xl"
                  className="form-checkbox rounded"
                  checked={selectedFilters.size.includes("xl")}

                  onChange={(e) => handleFilter("size", e.target.value)}
                /><label for="xl"> XL</label>
              </div>
            </div>
          </div>
          </div>
          {/* -----------------------------------------products -------------------------------------------------------------- */}
          <div className=" ">
            <div className="text-right p-2  bg-white shadow-sm">
              <label for="SORT" className="p-2">
                Sort by:
              </label>

              <select
          name="SORT"
          className="form-select r rounded"
          value={sortBy}
          onChange={handleSort}
        >
                <option value="none">none</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* ------------------------------sort by DROPDOWN---------------------------------------------- */}
            {/*--------------------------------------- main ------------------------------------*/}
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 p-2">
              {/* --------------------------------------------------------card-------------------------------------------------  */}
              {products.length > 0 ? (
        show
      ) : (
        <div>No products found for the selected category.</div>
      )}

               
              {/* end  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productlayout;
