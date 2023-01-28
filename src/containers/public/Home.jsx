import React from 'react';
import { Section, Slider } from '../../components';
import { useSelector } from 'react-redux';


const Home = () => {
  
  const { friday,newEveryday,top100,xone } = useSelector(state => state.app);

  //

  return (
    <div className='overflow-y-auto'>
      <Slider />
      <Section data={friday} flag={true} />
      <Section data={newEveryday} />  {/* nhạc mới mỗi ngày */}
      <Section data={top100} flag={true} /> {/* top100 */}
      <Section data={xone} /> {/* XONE's CORNER */}
      <div className='h-[300px]'></div>
    </div>
  )
}

export default Home
