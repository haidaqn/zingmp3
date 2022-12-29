import React from 'react'
import icons from '../utils/icon';
import Search from './Search';

const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons;

const Header = () => {
  return (
    <div className="w-full flex justify-between">
      <div className='flex gap-6 items-center w-full'>
        <div className='flex gap-6 '>
          <span><HiArrowNarrowLeft size={24}/></span>
          <span><HiArrowNarrowRight size={24}/></span>
        </div>
        <div className='w-2/4'>
          <Search/>
        </div>
      </div>
      <div>
        <h1>dang nhap</h1>
      </div>
    </div>
  )
}

export default Header
