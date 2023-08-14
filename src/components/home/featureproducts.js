import React from "react";

const featureproducts = () => {
  return (
    <>
      <div className="">
        <div className="text-center text-lg">
          <h1>FEATURED PRODUCTS</h1>
        </div>
        <div className="flex justify-center">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4  w-4/5">
            <div className="">
              {/* image */}
              <div className="">
                <img
                  src="products/shoes.jpg"
                  className="object-fill h-[250px] w-full"
                  alt="nike shoes"
                />
              </div>
              <div className=" md:text-md text-xs">
                {/* discription */}
                <a href="https/" className="font-bold">Nike air zoom pegasus 35</a>
                {/*price*/}
                <p>$399.9</p>
              </div>
            </div>

            <div className="">
              {/* image */}
              <div className="">
                <img
                  src="products/shoes.jpg"
                  className="object-fill  h-[250px] w-full"
                  alt="nike shoes"
                />
              </div>
              <div className=" md:text-md text-xs">
                {/* discription */}
                <a href="https/" className="font-bold">Nike air zoom pegasus 35</a>
                {/*price*/}
                <p>$399.9</p>
              </div>
            </div>

            <div className="">
              {/* image */}
              <div className="">
                <img
                  src="products/shoes.jpg"
                  className="object-fill  h-[250px] w-full"
                  alt="nike shoes"
                />
              </div>
              <div className=" md:text-md text-xs">
                {/* discription */}
                <a href="https/" className="font-bold">Nike air zoom pegasus 35</a>
                {/*price*/}
                <p>$399.9</p>
              </div>
            </div>

            <div className="">
              {/* image */}
              <div className="">
                <img
                  src="products/shoes.jpg"
                  className="object-fill  h-[250px] w-full"
                  alt="nike shoes"
                />
              </div>
              <div className="md:text-md text-xs">
                {/* discription */}
                <a href="https/" className="font-bold">Nike air zoom pegasus 35</a>
                {/*price*/}
                <p>$399.9</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default featureproducts;
