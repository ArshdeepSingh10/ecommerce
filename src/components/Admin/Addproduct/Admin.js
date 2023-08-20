import React from 'react'
import Adminnav from './Adminnav'

import Sidenav from './Sidenav'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
  
    <Sidenav></Sidenav>
    <Outlet></Outlet>
    </div>
  )
}

export default Admin
