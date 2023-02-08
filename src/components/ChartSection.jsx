/* eslint-disable no-unused-vars */
import React, { memo ,useState, useEffect} from 'react';
import imgChart from '../assets/chart.jpg';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, registerables  } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

ChartJS.register(...registerables);

const ChartSection = () => {

  
  const { chart } = useSelector(state => state.app);
  const [data, setData] = useState({});

  const options = {
      responsive: true,
      pointRadius: 0,
      aspectRatio: 4,
      scales: {
        y: {
          ticks: { display: false },
          grid: { borderDash: [4, 20], color: 'white' }
        },
        x: {
          ticks: { color: 'blue' },
          grid: { color: 'transparent' }
        }
      },
      plugins: {legend : false}
    } 
  useEffect(()=>{
    const labels = chart?.chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => item.hour);
    const datatset = [];
    if (chart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datatset.push({
          data: chart?.chart?.items[Object.keys(chart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
          borderColor: i === 0 ? 'blue' : i === 1 ? 'yellow' : 'red',
          backgroundColor: i === 0 ? 'rgb(74,144,226)' : i === 1 ? 'rgb(39, 189, 156)' : 'rgb(227, 80, 80)',
          pointBorderColor: i === 0 ? 'rgb(74,144,226)' : i === 1 ? 'rgb(39, 189, 156)' : 'rgb(227, 80, 80)',
          pointHoverBackgroundColor: i === 0 ? 'rgb(74,144,226)' : i === 1 ? 'rgb(39, 189, 156)' : 'rgb(227, 80, 80)',
          borderWidth : 2,
          tension: 0.3,
          pointStyle : 'circle',
          pointBackgroundColor: 'white',
          pointHoverBorderColor: 'white',
          pointHoverBorderWidth: 3,
          radius: 5,
          pointHoverRadius: 8,
        })
      }
      setData({ labels, datatset });
    }   // console.log(labels); console.log(datatset);
  },[chart]);
  // console.log(data);

  return (
    <div className='relative'>
      <img src={imgChart} alt='chart' className='w-full object-contain rounded-md opacity-40 max-h-[300px]' />
      <div className='absolute top-0 left-0 right-0 bottom-0 text-white z-15 bg-[rgba(77,34,104,0.8)]'></div>
      <div className='absolute top-0 left-0 right-0 bottom-0 text-white z-20 p-5'>
        <h3>#zingchart</h3>
        <div className='flex gap-4'>
          <div className='flex-4'>rank</div>
          <div className='flex-6'>
            {/* { data && <Line  data={ data } options={ options } /> ERROR } */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ChartSection)
