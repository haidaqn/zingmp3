import React, { memo } from 'react';
import moment from 'moment';
import 'moment/locale/vi'
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';

const SongItems = ({ thumbnail, title, artists, releaseDate,idSong}) => {

  const dispatch = useDispatch();

//

  return (
    <div className='w-[30%] flex-auto flex p-[10px] rounded-[6px] hover:bg-[#2F2739]'>
      <img
        onClick={() => {
          dispatch(actions.play(true))
          dispatch(actions.setCurSongId(idSong))
        }}  
        className='w-[60px] h-[60px] mr-[10px] object-cover rounded-sm cursor-pointer' src={thumbnail} alt='thumbnail' />
      <div className='overflow-hidden flex flex-col'>
        <span className='text-white text-sm font-semibold'>{`${title.slice(0,24)}...`}</span>
        <span className='text-xs text-gray-400'>{artists}</span>
        <span>{moment(releaseDate * 1000).fromNow()}</span>
      </div>
    </div>
  )
}

export default memo(SongItems)
