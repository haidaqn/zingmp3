import React from 'react';
import { Header, Slider } from '../../components';

const Home = () => {
  
  return (
    <div className='overflow-y-auto'>
      <div className='h-[70px] px-[59px] flex items-center text-[#544e5c]'>
        <Header />
      </div>
        <Slider />
    </div>
  )
}

export default Home
