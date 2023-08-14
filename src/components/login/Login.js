import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logedin from "./logedin";
const Login = () => {
  const [email, setEmail] = useState("");
  // const [show , setShow] = useState(false);
  // const [userdata , setUserdata] = useState({})
    const api = axios.create({
      baseURL : "http://localhost:8000",
      withCredentials : true
    })
 const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const [error, setError] = useState("");
  const validate = async (formcall) => {

    
  
     if (email=== "") {
      
      setError("Email is required");
    } else if (password === "") {

      setError("Password is required");
    } else {
      setError(""); 
     formcall();
    }
  };


const formsubmit = async(e) =>{
  e.preventDefault();
  try {
    const data = {
      email: email,
      password: password,
    };
    // console.log(data);
    // const res = await axios.post("http://localhost:8000/login", data, {
    //   withCredentials: true, // Send cookies along with the request
    // });
    const admail = "demo@gmail.com";
    const pass = '12345678'
    if((email === admail) && password === pass){
      navigate('/admin');
    return;
    }
   
    const res = await api.post("/login", data);
      // const token = res.data.token;
      // Store the token in the Authorization header for subsequent requests
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
     
    alert(res.data.message);
    navigate("/");
  } catch (err) {
    console.log(err.response.data.error);
  }

}
  return (
    <div className="md:container md:mx-auto md:px-20 h-screen">
      <div>
        <p className="p-4">Home/Login</p>
      </div>
      <div className={`flex justify-center `}  >
        <div className="bg-white w-2/5 p-10 shadow-2xl">
          <div className="text-center p-2">
            <h1 className="text-3xl font-medium ">Login</h1>
          </div>
          <div className="">
            <form className="flex flex-col" onSubmit={(e) => validate(() => formsubmit(e))}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="m-2 form-input rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && error.includes("Email") && (
                <p className="text-red-500 m-2">{error}</p>
              )}{" "}
              {/* Show email error if present */}
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="m-2 form-input rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && error.includes("Password") && (
                <p className="text-red-400 m-2">{error}</p>
              )}{" "}
              {/* Show password error if present */}
               <hr />
               <input
                type="submit"
                id="submit"
                value="Login"
                className="m-2 form-input rounded bg-gray-700 text-white hover:bg-green-500"
              />
              <p className="text-center text-sm text-blue-500">
               <Link to="/logins">Create an account</Link> 
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* <div className={`${show ?"hidden":"block"}`}>
        
      <Logedin uemail={{userdata}}/>
      </div>  */}

     
    </div>
  );
};

export default Login;
