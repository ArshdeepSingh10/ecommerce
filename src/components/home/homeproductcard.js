import React from "react";
import { Link } from "react-router-dom";
const homeproductcard = () => {
  return (
    < >
    <div className="md:container md:mx-auto md:px-10">
      <div className="grid grid-cols-12 m-3 gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className=" w-auto">
            <img
              src="kid-shoes.jpeg"
              className="h-full w-full"
              alt="cardimage"
            />
          </div>
          <div className="p-1">
            <div className="h-full">
              <h1 className="p-1 font-bold">KIDS SHOES COLLECTION</h1>
              <p className="p-1">
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>

              <Link to="/kids"> <button className="p-1 bg-black text-white cursor-pointer">SHOP KIDS</button></Link>
            </div>
          </div>
        </div>



        <div className="col-span-12 md:col-span-4">
          <div className="w-auto">
            <img
              src="men-shoes.jpeg"
              className="h-full w-full"
              alt="cardimage"
            />
          </div>
          <div className="p-1">
            <div className="h-full">
              <h1 className="p-1 font-bold">MEN SHOES COLLECTION</h1>
              <p className="p-1">
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>

            <Link to="/men"><button className="p-1 bg-black text-white cursor-pointer">SHOP MEN</button></Link>
            </div>
          </div>
        </div>


        <div className="col-span-12 md:col-span-4  ">
          <div className=" w-auto ">
            <img
              src="women-shoes.jpeg"
              className="h-full w-full"
              alt="cardimage"
            />
          </div>
          <div className="p-1">
            <div className="h-full">
              <h1 className="p-1 font-bold">WOMEN SHOES COLLECTION</h1>
              <p className="p-1">
                Constructed from luxury nylons, leathers, and custom hardware,
                featuring sport details such as hidden breathing vents,
                waterproof + antimicrobial linings, and more.
              </p>

              <Link to="/women"><button className="p-1 bg-black text-white cursor-pointer">SHOP WOMEN</button></Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default homeproductcard;
