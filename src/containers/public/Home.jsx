import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Section, Slider,Partner,Release } from '../../components';


const Home = () => {
  
  const { friday,newEveryday,top100,newChart } = useSelector(state => state.app);

  //

  return (
    <div className='overflow-y-auto'>
      <Slider />
      <Section data={friday} flag={true} />
      {/* <Release /> ERROR */}
      <Section data={newEveryday} />  {/* nhạc mới mỗi ngày */}
      <Section data={top100} flag={true} /> {/* top100 */}
      
      <div className='flex items-center w-full mt-12'>
      {
          newChart?.slice(0,3).map( (item, index) => (
            <Link key={item.link} to={item?.link.split('.')[0]} className='flex-1 justify-between px-2'>
              <img src={item.cover} alt='cover' className='w-full object-cover rounded-md ' />
            </Link>
          ))          
      }
      </div>
      <Partner/>
    </div>
  )
}

export default Home
