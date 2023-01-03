import React from 'react'
import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight } from '../../components';

const Public = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-[#170f23]">
      <div className='w-full h-full flex flex-auto'>
        <div className="w-[240px] flex-none bg-[hsla(0,0%,100%,0.05)] ">
          <SidebarLeft/>
        </div>
        <div className="flex-auto">
          <Outlet />
        </div>
        <div className="animate-slide-left w-[330px] hidden 1600:flex flex-none border-l-[1px] border-[#2d2537] bg-[#170f23]">
          <SidebarRight/>
        </div>
      </div>
      <div className='flex-none h-[90px] border-t-[1px] border-[#2d2537]'>
        <Player/>
      </div>
    </div>
  )
}

export default Public;
