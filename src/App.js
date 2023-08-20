import React from 'react'
import Nav from './components/all/Nav'
import { Link, Outlet } from 'react-router-dom'
import Footer from './components/all/footer'
const App = () => {
  return (
    <div>
      <Nav/>
<Outlet></Outlet>

     <a href="https://www.linkedin.com/in/arshdeep-singh-0779b5254/"><h1 className="text-lg block bottom-0 text-center bg-slate-100 font-bold  shadow-inner  p-4">
   <Footer></Footer>
    </h1></a> 
   
    </div>
  )
}

export default App
