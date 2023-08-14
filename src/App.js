import React from 'react'
import Nav from './components/all/Nav'
import { Link, Outlet } from 'react-router-dom'
import Footer from './components/all/footer'
const App = () => {
  return (
    <div>
      <Nav/>
<Outlet></Outlet>

     <Link to ="admin"><h1 className="text-lg block bottom-0 text-center bg-slate-100 font-bold  shadow-inner  p-4">
   <Footer></Footer>
    </h1></Link> 
   
    </div>
  )
}

export default App
