import React from "react";
import { FaBoxArchive, FaBoxOpen, FaHouse, FaLink } from "react-icons/fa6";
import Addproducts from "./Addproducts";
import Productcol from "./Productcol";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="float-left sticky top-0 bg-white pr-10 mr-3  h-screen">
      
          <div>
            <h1 className="text-md p-3">QUICK LINKS</h1>
          </div>
          {/*------------------- QUICK LINKS LIST --------------------------- */}
          <div>
            <ul className="p-4 py-1">
              <li className="p-2">
                <div className="flex gap-2">
                  <FaHouse /> <p> Dashboard</p>
                </div>
              </li>
              <li className="p-2">
                <div className="flex gap-2">
                  <FaBoxArchive />
                  <p> <Link to="/admin">New Product</Link> </p>
                </div>
              </li>
            </ul>
          </div>

          {/* ============================================================ */}

          {/*----------------------- Quick links -------------------------------------- */}
          <div>
            <h1 className="text-md p-3">CATALOG</h1>
          </div>
          {/*------------------- QUICK LINKS LIST --------------------------- */}
          <div>
            <ul className="p-4 py-1">
              <li className="p-2">
                <div className="flex gap-2">
                  <FaBoxArchive />
                  <p><Link to="/admin/products">Products</Link> </p>
                </div>
              </li>
              
              
            </ul>
          </div>
          <div>
            <h1 className="text-md p-3">ORDER</h1>
          </div>
          {/*------------------- QUICK LINKS LIST --------------------------- */}
          <div>
            <ul className="p-4 py-1">
              
              <li className="p-2">
                <div className="flex gap-2 cursor-pointer">
                  <FaBoxOpen /> <Link to='/admin/order'><p>Order</p></Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
       
   
  );
};

export default Sidenav;
