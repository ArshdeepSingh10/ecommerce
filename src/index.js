import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Productlayout from "./components/products/productlayout";
import Addtocard from "./components/AddToCard/Addtocard";
import Checkout from "./components/CheckOut/Checkout";
import Login from "./components/login/Login";
import Logedin from "./components/login/logedin";
import Admin from "./components/Admin/Addproduct/Admin";
import Product from "./components/productDetail/product";

import store from "./reducers/store";
import Register from "./components/login/Register";
import Countinueshopping from "./components/CheckOut/Countinueshopping";
import Addproducts from "./components/Admin/Addproduct/Addproducts";
import Productcol from "./components/Admin/Addproduct/Productcol";
import Order from "./components/Admin/Addproduct/Order";
const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(store);
root.render(
  <React.StrictMode>
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/:category" element={<Productlayout />} />
            <Route path="/addtocard" element={<Addtocard />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Logedin/>} />
            <Route path="/logins" element={<Register />} />
            <Route path="/:category/:proid" element={<Product />} />
            <Route path ="/checkout/contiueshoping" element ={<Countinueshopping/>}></Route>
          </Route>
          <Route path="/admin" element={<Admin />} >
            <Route index element={<Addproducts/>} />
            <Route path="/admin/products" element={<Productcol/>} />
            <Route path="/admin/order" element={<Order/>} />
          </Route>
       
        </Routes>
      </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
