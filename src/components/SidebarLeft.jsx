import React from 'react'
import logo from '../assets/logo.svg';
import { sidebarMenu } from '../utils/menu';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import path from '../utils/path'
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';

const notActiveStyle = 'py-2 px-[25px] font-bold text-[13px] flex gap-3 items-center text-[#cfcfd0]';
const activeStyle = 'py-2 px-[25px] font-bold text-[13px] flex gap-3 items-center text-[#f7f6f7] border-l-[3px] border-[#9b4de0] bg-[hsla(0,0%,100%,0.2)]';

const SidebarLeft = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col'>
      <div onClick={() => {
        dispatch(actions.playAlbum(false));
        navigate(path.HOME);
      }
      } className='w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center'>
        <img src={logo} alt="logo" className='w-[120px] h-10'/> 
      </div>
      <div className='flex flex-col'>
        {sidebarMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={() => dispatch(actions.playAlbum(false))}
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
