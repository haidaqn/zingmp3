import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import { getHome } from '../../service/Home';

const Home = () => {
  
  const [home, setHome] = useState();

  useEffect(() => { 
    const getListHome = async () => {
      const res = await getHome();
      setHome(res);
    };
    getListHome();
  }, []);
  
  console.log(home);
  
  return (
    <div className='overflow-y-auto'>
      <div className='h-[70px] px-[59px] flex items-center text-[#544e5c]'>
        <Header />
      </div>
    </div>
  )
}

export default Home
