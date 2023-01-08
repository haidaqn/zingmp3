import React, { useEffect, useState,useRef } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import * as apis from '../apis';
import icons from '../utils/icon';
import * as actions from '../store/actions';

const Player = () => {

  const dispatch = useDispatch();
  const { currentSongId, isPlaying } = useSelector(state => state.music);
  const { AiOutlineHeart, AiFillHeart, MdSkipNext,
    MdSkipPrevious, CiRepeat, BsPauseFill, BsFillPlayFill, CiShuffle } = icons;
  const [heart, setHeart] = useState(true);
  // const [audio, setAudio] = useState(new Audio());
  const audio = useRef(new Audio());
  const [source, setSource] = useState(null);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.getDetailSong(currentSongId),
        apis.getMusic(currentSongId)
      ])
      if (res1.data.err === 0) {
        setSongInfo(res1?.data?.data);
      }
      if (res2.data.err === 0) {
        // setAudio(new Audio(res2.data.data['128']));
        setSource(res2?.data.data['128']);
      }
      
    }
    fetchDetailSong();
  }, [currentSongId])
 
  const handleHeart = () => {
    setHeart(prev => !prev);
  }
  
  useEffect(() => {
    audio.current.src = source;
    if (isPlaying) 
      audio.current.play();
  },[audio, isPlaying, source]);

  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audio.current.pause();
      dispatch(actions.play(false))
    } else {
      audio.current.play();
      dispatch(actions.play(true))
    }
  }

  // 

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
                      onClick={handleTogglePlayMusic}
                >
                  {isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
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