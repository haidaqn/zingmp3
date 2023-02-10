import React,{useState,useEffect} from 'react'
import icons from '../utils/icon';
import { useSelector } from 'react-redux';
import { SongItem } from './';
import * as apis from '../apis';
import { apiGetDeTailPlayList } from '../apis';
import { Scrollbars } from 'react-custom-scrollbars-2';


const SidebarRight = () => {

  const {AiOutlineEllipsis,TfiAlarmClock  } = icons;
  const [isRecent,setIsRecent] = useState(true);
  const { currentSongData, albumId, recentSongs, isPlaying} = useSelector(state => state.music);
  // console.log(currentSongData);
  const [playlist, setPlayList] = useState();

  useEffect(() => {
    const fetchDataPlayList = async () => {
      const res = await apiGetDeTailPlayList(albumId);
      // console.log(res);
      if (res?.data?.err === 0) setPlayList(res?.data?.data?.song.items);
    }

    if (albumId) fetchDataPlayList();

  }, [albumId])
  
  useEffect(() => {
    isPlaying && setIsRecent(true);
  },[isPlaying]);

  // console.log(recentSongs);

  return (
    <div className='text-xs text-white flex flex-col w-full f-full'>
      <div className='h-[70px] w-full flex flex-none py-[14px] px-4 items-center justify-between gap-4'>
        <div className='flex flex-auto py-[6px] px-[4px] justify-center rounded-l-full rounded-r-full bg-[hsla(0,0%,100%,0.1)]'>
          <span
            onClick={()=> setIsRecent(true)}
            className={`cursor-pointer py-[5px] flex-1 flex justify-center rounded-l-full rounded-r-full items-center ${isRecent && 'bg-[hsla(0,0%,100%,0.2)]'}`}>Danh sách phát</span>
          <span
            onClick={()=> setIsRecent(false)}
            className={`cursor-pointer py-[5px] flex-1 flex justify-center rounded-l-full rounded-r-full items-center ${!isRecent && 'bg-[hsla(0,0%,100%,0.2)]'}`}>Nghe gần đấy</span>
        </div>
        <div className='flex gap-2'>
          <span className='cursor-pointer rounded-full  p-1 flex items-center justify-center bg-[hsla(0,0%,100%,0.2)] opacity-90 hover:opacity-100'><TfiAlarmClock size={24}/></span>
          <span className='cursor-pointer rounded-full  p-1 flex items-center justify-center bg-[hsla(0,0%,100%,0.2)] opacity-90 hover:opacity-100'><AiOutlineEllipsis size={24}/></span>
        </div>
      </div>
      {isRecent ? (<div className='w-full flex flex-auto flex-col px-2 '>
         <Scrollbars autoHide style={{width:'100%', height : '100%'}}>
          <SongItem thumbnail={currentSongData?.thumbnail} title={currentSongData?.title}
            artists={currentSongData?.artistsNames} idSong={currentSongData?.encodeID}
            sm='1'
            styleCss = 'bg-[#9B4DE0]'
          />
          <div className='py-[15px] px-[8px] flex flex-col text-sm'>
            <span className='text-white font-bold ]'>Tiếp theo</span>
            <span className='flex gap-2'>
              <span className='text-[hsla(0,0%,100%,0.2)] '>Từ playlist</span>
              <span className='font-medium text-[#9B4DE0]'>{currentSongData?.album?.title.slice(0,30)}</span>
            </span>
          </div>
          { playlist &&
            <div className='w-full flex flex-auto flex-col px-2 overflow-hidden'>
                  {playlist.map(item => (
                    <SongItem
                      key={item?.encodeId}
                      thumbnail={item.thumbnail} title={item.title}
                      artists={item.artistsNames} idSong={item.encodeID}
                      sm='1' 
                      hv
                    />
                  ))}
            </div>
          }
        </Scrollbars>
      </div>) : (<div className='w-full flex flex-auto flex-col px-2 '>
          <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
            {recentSongs && <div className='w-full flex flex-auto flex-col px-2 overflow-hidden'>
                {recentSongs.map(item => (
                    <SongItem
                      key={item?.idSong}
                      thumbnail={item.thumbnail} title={item.title}
                      artists={item.artists} idSong={item.idSong}
                      sm='1' 
                      hv
                    />
                  ))}
            </div> }
          </Scrollbars>
      </div>)}
      
    </div>
  )
}

export default SidebarRight
