import React, { memo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import icons from '../utils/icon';


const HoverItem = ({ encodeId, thumbnailM, title, sortDescription, link }) => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imgRef = useRef();
    const [isHover, setIsHover] = useState(false);
    const { AiOutlineHeart, BsFillPlayFill,AiOutlineEllipsis  } = icons;
    
    //

    return (
        <div key={encodeId} className='flex flex-col gap-2 flex-1 text-sm mb-3'
            onClick={() => navigate(link.split('.')[0],{state: { playAlbum : false }})}
        >
            <div className='w-full relative overflow-hidden rounded-lg cursor-pointer'
                onMouseEnter = { () => setIsHover(prev => !prev )}
                onMouseLeave = { () => setIsHover(prev => !prev )}
            >
                {isHover && <div className='absolute z-40 top-0 left-0 right-0 bottom-0 bg-gray-400/50 flex items-center justify-center'>
                    <div className='flex items-center z-60 justify-center gap-3'>
                        <span className='rounded-full hover:bg-gray-500'><AiOutlineHeart size={25} /></span>
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(link.split('.')[0], { state: { playAlbum: true } });
                                }
                            }
                            className='cursor-pointer p-1 border-[2px] border-white rounded-full'> <BsFillPlayFill size={25} /> </span>
                        <span className='rounded-full hover:bg-gray-500'><AiOutlineEllipsis size={25} /></span>
                    </div>
                </div>}
                <img ref= {imgRef} src={thumbnailM} alt="ảnh lỗi"
                    className={`w-full  ${isHover ? 'animate-scale-up-img' : 'animate-scale-down-img'}`}
                    onClick={() => {
                        navigate(link.split('.')[0])
                        dispatch(actions.playAlbum(true))
                        dispatch(actions.play(true))
                    }}    
                />
            </div>
            <div className='flex flex-col'>
                <span className="font-bold mb-1 cursor-pointer hover:text-[#9b4de0]"
                    onClick={() => {
                        navigate(link.split('.')[0])
                        dispatch(actions.playAlbum(true))
                        dispatch(actions.play(true))
                    }}
                    >{`${title.slice(0,20)}...`}</span>
                <span>{ `${sortDescription.slice(0,24)}...`}</span>
            </div>
        </div>
  )
}

export default memo(HoverItem)
