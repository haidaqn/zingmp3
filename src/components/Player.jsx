import React, { useEffect, useState, useRef } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import * as apis from '../apis';
import icons from '../utils/icon';
import * as actions from '../store/actions';
import moment from 'moment';
import { toast } from 'react-toastify';

var intervalId;

const Player = () => {

  const { currentSongId, isPlaying, songs, atAlbum } = useSelector(state => state.music);
  const { AiOutlineHeart, AiFillHeart, MdSkipNext,
    MdSkipPrevious, CiRepeat, BsPauseFill, BsFillPlayFill, CiShuffle } = icons;
  const [heart, setHeart] = useState(true);
  const [audio, setAudio] = useState(new Audio());
  const [songInfo, setSongInfo] = useState('');
  const [curSecond, setCurSecond] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const thumbRef = useRef();
  const progressBar = useRef();
  const dispatch = useDispatch();

  // get info song , link song theo encodeId
  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.getDetailSong(currentSongId),
        apis.getMusic(currentSongId)
      ])
      if (res1?.data?.err === 0) {
        setSongInfo(res1?.data?.data);
      }
      if (res2?.data?.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data['128']));
      }
      else {
        audio.pause();
        toast.warn(res2.data.msg);
        setAudio(new Audio());
        setCurSecond(0);
        dispatch(actions.play(false));
        thumbRef.current.style.cssText = `right: 100%`;
      }
    }
    fetchDetailSong();
  }, [currentSongId])
 
  const handleHeart = () => {
    setHeart(prev => !prev);
  }
  
  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying === true) {
      audio.play();
      intervalId = setInterval(() => {
        let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        setCurSecond(Math.round(audio.currentTime * 1000));
      }, 200)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[audio]);

  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false))
    } else {
      audio.play();
      dispatch(actions.play(true))
    }
  }
  //progress bar
  const handleProgressBar = (e) => {
    
    const progressBarRef = progressBar.current.getBoundingClientRect();
    let percent = Math.round(((e.clientX - progressBarRef.left) *10000 / progressBarRef.width) / 100);
    thumbRef.current.style.cssText = `right: ${100- percent}`
    audio.currentTime = percent * songInfo.duration / 100;
  }
  // next song
  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs.forEach( (item,index) => {
        if (item.encodeId === currentSongId) {
          if (index === songs.length - 1 ) {
            currentSongIndex = 0;
          } else {
            currentSongIndex = index + 1;
          }
        }
      });
      if (shuffle === true) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        if (randomIndex === currentSongIndex) {
          randomIndex = randomIndex - 1;
        }
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
      }
      else {
        dispatch(actions.setCurSongId(songs[currentSongIndex].encodeId));
      }
      dispatch(actions.play(true));
    }
  }
  // prev song
  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs.forEach( (item,index) => {
        if (item.encodeId === currentSongId) {
          if (index === 0) {
            currentSongIndex = songs.length - 1;
          } else {
            currentSongIndex = index - 1;
          }
        }
      });
      if (shuffle === true) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        if (randomIndex === currentSongIndex) {
          randomIndex = randomIndex - 1;
        }
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
      }
      else {
        dispatch(actions.setCurSongId(songs[currentSongIndex].encodeId));
      }
      dispatch(actions.play(true));
    }
  }
  // shuffle song
  const handleShuffle = () => {
    setShuffle(prev => !prev);
  }

  const handleRepeat = () => {
    setRepeat(prev => !prev);
  }

  // 

  return (
    <div className='bg-[#130c1c] text-white px-5 h-full flex py-2'>
        <div className='w-[30%] flex-auto flex items-center ml-5'>
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
                <span onClick={handleShuffle} className={`${shuffle ? 'cursor-pointer' : 'text-gray-500/80'}`} title='Bật phát ngẫu nhiên'><CiShuffle size={24}/></span>
                <span className={`${!atAlbum ? 'text-gray-500/80' : 'cursor-pointer'}`} onClick={!atAlbum ? '':handlePrevSong}><MdSkipPrevious size={24}/></span>
                <span className='cursor-pointer p-1 border-[2px] border-gray-700 hover:text-teal-600 rounded-full'
                      onClick={handleTogglePlayMusic}
                >
                  {isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                </span>
                <span className={`${!atAlbum ? 'text-gray-500/80' : 'cursor-pointer'}`} onClick={!atAlbum ? '':handleNextSong}><MdSkipNext size={24}/></span>
                <span onClick={handleRepeat} className={`${repeat ? 'cursor-pointer' : 'text-gray-500/80'}`} title='Bật phát lại tất cả'><CiRepeat size={24}/></span>
            </div>
            <div className='w-full flex justify-center items-center gap-3'>
                <span>{moment.utc(curSecond ).format('mm:ss')}</span>
                  <div
                    ref={progressBar}
                    onClick={handleProgressBar}  
                    className='w-[60%] h-[3px] hover:h-2 rounded-l-full rounded-r-full bg-white relative cursor-pointer '>
                  <div ref={thumbRef} id='thumb-progress' className='absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#9b4de0]'></div>
                </div>
                <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
            </div>
        </div>
        <div className='w-[30%] flex-auto'>Volume</div>
    </div>
  )
}

export default Player