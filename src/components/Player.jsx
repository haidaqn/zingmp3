import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as apis from '../apis';
import icons from '../utils/icon';

const Player = () => {

  const { currentSongId, isPlaying } = useSelector(state => state.music);
  
  const { AiOutlineHeart, AiFillHeart, BsThreeDots, MdSkipNext,
            MdSkipPrevious, CiRepeat, BsPauseFill, BsFillPlayFill, CiShuffle } = icons;
  const audioSong = new Audio();
  const [heart, setHeart] = useState(true);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState(null);
  const [source, setSource] = useState(null);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const response1 = await apis.getDetailSong(currentSongId);
      const response2 = await apis.getMusic(currentSongId);
      if (response1.data.err === 0) {
        setSongInfo(response1?.data?.data);
      }
      if (response2.data.err === 0) {
        setSource(response2?.data?.data['128']);
      }
    }
    fetchDetailSong();
  }, [currentSongId])
  
  useEffect(() => {
    // audioSong.play();
  },[currentSongId])

  const handleHeart = () => {
    setHeart(prev => !prev);
  }



  return (
    <div className='bg-[#130c1c] text-white px-5 h-full flex py-2'>
      <div className='w-[30%] flex-auto flex items-center'>
        <img src={songInfo?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md' />
        <div className='text-white flex flex-col gap-2 ml-2'>
          <span className='font-semibold text-sm'>{songInfo?.title}</span>
          <span className='text-[#78747d] text-xs'>{songInfo?.artistsNames}</span>
        </div>
        <div className='text-white ml-2'>
          {heart ? <div onClick={() => handleHeart()}><AiFillHeart size={26} /></div> :
            <div onClick={() => handleHeart()}><AiOutlineHeart size={26}/></div>}
        </div>
      </div>
      <div className='w-[40%] flex-auto flex-col flex gap-2 items-center'>
        <div className='flex gap-8 justify-center items-center '>
          <span className='cursor-pointer' title='Bật phát ngẫu nhiên'><CiShuffle size={24}/></span>
          <span className='cursor-pointer'><MdSkipPrevious size={24}/></span>
          <span className='cursor-pointer p-1 border-[2px] border-gray-700 hover:text-teal-600 rounded-full'
          >
            {isPlaying ? <BsPauseFill size={34} /> : <BsFillPlayFill size={34} />}
          </span>
          <span className='cursor-pointer'><MdSkipNext size={24}/></span>
          <span className='cursor-pointer' title='Bật phát lại tất cả'><CiRepeat size={24}/></span>
        </div>
        <div>progress bar</div>
      </div>
      <div className='w-[30%] flex-auto'>Volume</div>
    </div>
  )
}

export default Player
