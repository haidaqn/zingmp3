import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Section = () => {

    const navigate = useNavigate();
    const { friday } = useSelector(state => state.app);

    console.log(friday);

    const itemFriday = friday.items;

    //
    return (
        <div className='flex flex-col gap-5 mt-12 text-white mb-5'>
            <div className='flex items-center justify-between gap-5'>
                <h1 className='text-5 font-bold'>{ friday?.title }</h1>
                <span className='text-xs'>TẤT CẢ</span>
            </div>
            <div className='flex justify-between gap-[28px]'>
                {itemFriday && itemFriday.slice(0,5).map( item => 
                    (
                    <div key={item?.encodeId} className='flex flex-col gap-2 flex-1 text-sm '>
                        <img src={item?.thumbnailM} alt="ảnh lỗi"
                            className='w-full rounded-lg mb-3 cursor-pointer '
                            onClick={() => navigate(item?.link.split('.')[0])}    
                        />
                        <div className='flex flex-col'>
                            <span className="font-bold mb-1 cursor-pointer hover:text-[#9b4de0]"
                                onClick={() => navigate(item?.link.split('.')[0])} 
                                >{item?.title}</span>
                            <span>{ `${item?.sortDescription.slice(0,46)}...`}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Section);
