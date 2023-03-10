/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import * as apis from '../apis';
import icons from '../utils/icon';
import * as actions from '../store/actions';
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingSong  from './LoadingSong';

var intervalId;

const Player = ({setIsShowSidebarRight}) => {

  const dispatch = useDispatch();
  const { currentSongId, isPlaying, songs, atAlbum,isLoadedSource } = useSelector(state => state.music);
  const { AiOutlineHeart, AiFillHeart, MdSkipNext,
    MdSkipPrevious, CiRepeat, BsPauseFill, BsFillPlayFill, CiShuffle, TbRepeatOnce, BsMusicNoteList,SlVolume2,SlVolume1, SlVolumeOff } = icons;
  const [audio, setAudio] = useState(new Audio());
  const [songInfo, setSongInfo] = useState('');
  const [curSecond, setCurSecond] = useState(0);
  const [heart, setHeart] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [checkSource, setCheckSource] = useState(true);
  const [volume, setVolume] = useState(30);
  const [isHover, setIsHover] = useState(true);
  const thumbRef = useRef();
  const progressBar = useRef();
  const rightRef = useRef();

  // get info song , link song theo encodeId
  useEffect(() => {
    const fetchDetailSong = async () => {
      dispatch(actions.setSource(true));
      setCheckSource(true);
      const [res1, res2] = await Promise.all([
        apis.getDetailSong(currentSongId),
        apis.getMusic(currentSongId)
      ])
      dispatch(actions.setSource(false));
      setCheckSource(false);
      if (res1?.data?.err === 0) {
        setSongInfo(res1?.data?.data);
        dispatch(actions.setCurrentSongData(res1?.data?.data));
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
 
  
  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
      dispatch(actions.setSource(true));
      setCheckSource(false);
    } else {
      audio.play();
      dispatch(actions.play(true));
      dispatch(actions.setSource(false));
      setCheckSource(false);
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
    if (atAlbum) {
      dispatch(actions.play(false));
      dispatch(actions.setSource(true));
      setCheckSource(true);
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
        if (isShuffle === true) {
          let randomIndex = Math.floor(Math.random() * songs.length);
          if (randomIndex === currentSongIndex) {
            randomIndex = randomIndex - 1;
          }
          dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
        }
        else {
          dispatch(actions.setCurSongId(songs[currentSongIndex].encodeId));
        }
        dispatch(actions.play(true));
        dispatch(actions.setSource(false));
        setCheckSource(false);
      } 
    }
  }
  // prev song
  const handlePrevSong = () => {
    if (atAlbum) {
      dispatch(actions.play(false));
      dispatch(actions.setSource(true));
      setCheckSource(true);
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
        if (isShuffle === true) {
          let randomIndex = Math.floor(Math.random() * songs.length);
          if (randomIndex === currentSongIndex) {
            randomIndex = randomIndex - 1;
          }
          dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
        }
        else {
          dispatch(actions.setCurSongId(songs[currentSongIndex].encodeId));
        }
        dispatch(actions.play(true));
        dispatch(actions.setSource(false));
        setCheckSource(false);
      }
    }
  }

  useEffect(() => {
    function handleEnded() {
      songs.forEach((item, index) => {
        if (item.encodeId === currentSongId) {
          if (isRepeat) {
            console.log("??ang ??? ph??t l???i");
            audio.pause();
            dispatch(actions.play(true));
            audio.play();
          }
          else if (isShuffle) {
              console.log("??ang ??? t??? ph??t random");
              dispatch(actions.setCurSongId(songs[Math.floor(Math.random() * songs.length)].encodeId));
              dispatch(actions.play(true));
          }
          else {
            console.log("??ang ??? t??? chuy???n b??i");
            if (index === songs.length - 1) {
              dispatch(actions.setCurSongId(songs[0].encodeId));
              dispatch(actions.play(true));
            } else {
              dispatch(actions.setCurSongId(songs[index + 1].encodeId));
              dispatch(actions.play(true));
            }
          }
        } 
      })
    }
    audio.addEventListener('ended',handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    }
  },[audio,isRepeat,isShuffle]);
  
  useEffect(() => {
    audio.volume = (volume / 100).toFixed(1);
    if (rightRef.current) {
      rightRef.current.style.cssText = `right: ${100-volume}%`;
    }
  },[volume]);


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
            {heart ? <div onClick={() => setHeart(prev => !prev)}><AiFillHeart size={26} /></div> :
              <div onClick={() => setHeart(prev => !prev)}><AiOutlineHeart size={26}/></div>}
          </div>
        </div>
        <div className='w-[40%] flex-auto flex-col flex gap-2 items-center'>
            <div className='flex gap-8 justify-center items-center '>
                <span onClick={ () => setIsShuffle(prev => !prev)} className={` cursor-pointer ${!isShuffle && 'text-gray-500/80'}`} title='B???t ph??t ng???u nhi??n'><CiShuffle size={24}/></span>
                <span className={`${!atAlbum ? 'text-gray-500/80' : 'cursor-pointer'}`} 
                  onClick={()=>handlePrevSong()}><MdSkipPrevious size={24}/></span>
                <span className='cursor-pointer p-1 border-[2px] border-gray-700 hover:text-teal-600 rounded-full'
                      onClick={()=>handleTogglePlayMusic()}
                >
                  { isLoadedSource && checkSource ? <LoadingSong /> : isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                </span>
                <span className={`${!atAlbum ? 'text-gray-500/80' : 'cursor-pointer'}`} 
                  onClick={()=>handleNextSong()}><MdSkipNext size={24}/></span>
                <span onClick={() => setIsRepeat(prev => !prev)} className='cursor-pointer' title='Ph??t l???i'>{ isRepeat ? <TbRepeatOnce size={24}/> : <CiRepeat size={24}/> } </span>
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
        <div className='w-[30%] flex-auto flex items-center justify-end gap-4 mr-5'>
            <div className='flex gap-4 items-center'
              onMouseEnter={() => setIsHover(false)}
              onMouseLeave={() => setIsHover(true)}
            >
              <span onClick={() => setVolume(prev => +prev === 0 ? 50 : 0) }>{ +volume >= 50 ? <SlVolume2 size={25}/> : +volume === 0 ? <SlVolumeOff size={25}/> : <SlVolume1 size={25}/> }</span>
              {!isHover && <input className='w-[130px] text-white' type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(e.target.value)} /> }    
              <div className={`w-[130px] h-[5px] bg-[#595460] rounded-l-full rounded-r-full ${isHover ? 'relative' : 'hidden'} `}>
                <div ref={rightRef} className='absolute top-0 left-0 bottom-0 bg-white rounded-l-full rounded-r-full'></div>
              </div>
            </div>
            <span title='Danh s??ch ph??t'
                  className='bg-[#9B4DE0] hover:opacity-90 border rounded-sm cursor-pointer border-[#9B4DE0]'
                    onClick={()=> setIsShowSidebarRight(prev => !prev)}
            >
              <BsMusicNoteList size={30}/>
            </span>
        </div>
    </div>
  )
}

export default Player