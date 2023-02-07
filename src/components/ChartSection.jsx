/* eslint-disable no-unused-vars */
import React, { memo ,useState, useEffect} from 'react';
import imgChart from '../assets/chart.jpg';

import { useSelector } from 'react-redux';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const ChartSection = () => {

  const options = {
    responsive: true,
    pointRadius: 0,
    aspectRatio: 4,
    scales: {
      y: {
        ticks: { display: false },
        grid: {borderDash : [1,4], color : 'gray'}
      },
      x: {
        ticks: { color: 'blue' },
        grid: {color : 'transparent'}
      }
    },
    plugins: {
      legend : false 
    }
  }
  const { chart } = useSelector(state => state.app);
  const [data, setData] = useState({});

  useEffect(()=>{
    const labels = chart?.chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => item.hour);
    const datatset = [];
    if (chart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datatset.push({
          data: chart?.chart?.items[Object.keys(chart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
          borderColor: i === 0 ? 'blue' : i === 1 ? 'yellow' : 'red',
          tension: 0.2,
          borderWidth : 2,
        })
      }
    }
    // console.log(labels);
    // console.log(datatset);
    setData({ labels, datatset });
  },[chart]);

  console.log(data);

  return (
    <div className='relative'>
      <img src={imgChart} alt='chart' className='w-full object-contain rounded-md opacity-40 max-h-[300px]' />
      <div className='absolute top-0 left-0 right-0 bottom-0 text-white z-15 bg-[rgba(77,34,104,0.8)]'></div>
      <div className='absolute top-0 left-0 right-0 bottom-0 text-white z-20 p-5'>
        <h3>#zingchart</h3>
        <div className='flex gap-4'>
          <div className='flex-4'>rank</div>
          <div className='flex-6'>
            { data && <Line data={ data } options={ options } /> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ChartSection)
