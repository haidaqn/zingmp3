import React from 'react'
import logo from '../assets/logo.svg';
import { sidebarMenu } from '../utils/menu';
import { NavLink } from 'react-router-dom';

const notActiveStyle = 'py-2 px-[25px] font-bold text-[13px] flex gap-3 items-center text-[#cfcfd0]';
const activeStyle = 'py-2 px-[25px] font-bold text-[13px] flex gap-3 items-center text-[#f7f6f7] border-l-[3px] border-[#9b4de0] bg-[hsla(0,0%,100%,0.2)]';

const SidebarLeft = () => {
  return (
    <div className='flex flex-col'>
      <div className='w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center'>
        <img src={logo} alt="logo" className='w-[120px] h-10'/> 
      </div>
      <div className='flex flex-col'>
        {sidebarMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
          >
            {item.icons }
            <span className=''>{item.text }</span> 
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default SidebarLeft
