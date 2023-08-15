import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const validate = async (e) => {
      e.preventDefault();
  
      if (name === "") {
       
        setError("Name is required");
      } else if (email=== "") {
        
        setError("Email is required");
      } else if (password === "") {
  
        setError("Password is required");
      } else {
        setError("");
      }


      const data = {
        name: name,
        email: email,
        password: password,
      };

      try{
        const res = await axios.post("https://backend-pied-phi.vercel.app/logins",data);
        alert( res.data.message + "dfsd")
        navigate("/login")
    }catch(err){
console.log(err);
alert(err.response.data.error)
    }

    };
    
  return (
    <div className="md:container md:mx-auto md:px-20">
    <div>
      <p className="p-4">Home/Login</p>
    </div>
      <div className="flex justify-center">
       <div className="bg-white w-3/5 md:w-2/5 p-10 shadow-2xl">
         <div className="text-center p-2">
           <h1 className="text-3xl font-medium ">Create A New Account</h1>
         </div>
         <div className="">
            <form className="flex flex-col " onSubmit={validate}>
             <input
                type="text"
                id="name"
                placeholder="Full Name"
               value={name}
                className="  m-2 form-input rounded"
                onChange={(e) => setName(e.target.value)}
              />
              {error && error.includes("Name") && (
                <p className="text-red-500 m-2">{error}</p>
              )}

              <input
                type="email"
                id="email"
                placeholder="Email"
                className="  m-2 form-input rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              
              />
              {error && error.includes("Email") && (
                <p className="text-red-500 m-2">{error}</p>
              )}
              <input
                type="password"
                id="pasword"
                placeholder="Password"
                className=" m-2  form-input rounded"
                onChange={(e) => setPassword(e.target.value)}
                
              />
              {error && error.includes("Password") && (
                <p className="text-red-500 m-2">{error}</p>
              )}
              <hr />

              <input
                type="submit"
                id="submit"
                value="Sign Up"
                className=" m-2  form-input rounded bg-gray-700 text-white hover:bg-green-500"
                required
              />
              <p className="text-center text-sm">
               <Link to="/login">Already have an account?</Link> {" "}
                <span className="text-blue-500">Login</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
