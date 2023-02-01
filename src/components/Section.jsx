import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../store/actions';
import icon from '../utils/icon';
const Section = ({data,flag}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { FiChevronRight } = icon;

    const dataItem = data.items;

    //
    return (
        <div className='flex flex-col gap-5 mt-12 text-white mb-5'>
            <div className='flex items-center justify-between gap-5'>
                <h1 className='text-5 font-bold'>{ data?.title }</h1>
                {flag && (<span className='text-xs flex items-center justify-center'>TẤT CẢ<FiChevronRight size={20}/> </span>)}
            </div>
            <div className='flex justify-between gap-[28px]'>
                {dataItem && dataItem.slice(0,5).map( item => 
                    (
                    <div key={item?.encodeId} className='flex flex-col gap-2 flex-1 text-sm '>
                        <img src={item?.thumbnailM} alt="ảnh lỗi"
                            className='w-full rounded-lg mb-3 cursor-pointer '
                            onClick={() => {
                                navigate(item?.link.split('.')[0])
                                dispatch(actions.playAlbum(true))
                                dispatch(actions.play(true))
                            }}    
                        />
                        <div className='flex flex-col'>
                            <span className="font-bold mb-1 cursor-pointer hover:text-[#9b4de0]"
                                onClick={() => {
                                    navigate(item?.link.split('.')[0])
                                    dispatch(actions.playAlbum(true))
                                    dispatch(actions.play(true))
                                }}
                                >{`${item?.title.slice(0,20)}...`}</span>
                            <span>{ `${item?.sortDescription.slice(0,24)}...`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Section);
