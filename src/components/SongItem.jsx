import React, { memo } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import 'moment/locale/vi';

const SongItems = ({ thumbnail, title, artists, releaseDate, idSong, sm,styleCss,hv}) => {

  const dispatch = useDispatch();
  //
  return (
    <div className={` flex-auto flex p-[10px] rounded-[6px]  ${sm ? `${styleCss} w-full` : 'w-[30%]'} ${ hv && 'hover:bg-[#2F2739]'}`}>
        <div className='flex gap-4'>
          <img
          onClick={() => {
              dispatch(actions.setCurSongId(idSong));
              dispatch(actions.play(true));
              dispatch(actions.setRecent({ thumbnail, title , artists, idSong  }));
            }
          }  
          className={`object-cover rounded-sm cursor-pointer ${sm ? 'w-[40px] h-[40px]' :'w-[60px] h-[60px]'}`} src={thumbnail} alt='thumbnail' />
        <div className=' overflow-hidden flex flex-col'>
          <span className='text-white text-sm font-semibold'>{`${title?.slice(0,24)}...`}</span>
          <span className='text-xs text-gray-400'>{artists}</span>
          {
            releaseDate &&  <span>{moment(releaseDate * 1000).fromNow()}</span>
          }
        </div>
      </div>
    </div>
  )
}

export default memo(SongItems)
