import React from 'react'
import { Outlet } from 'react-router-dom';
import { SidebarLeft, SidebarRight } from '../../components';

const Public = () => {
  return (
    <div className="w-full h-screen flex bg-[#170f23]">
      <div className="w-[240px] flex-none bg-[hsla(0,0%,100%,0.05)] ">
        <SidebarLeft/>
      </div>
      <div className="flex-auto">
        <Outlet />
      </div>
      <div className="w-[330px] flex-none ">
        <SidebarRight/>
      </div>
    </div>
  )
}

export default Public;
