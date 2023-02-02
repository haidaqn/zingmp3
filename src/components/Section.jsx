import React, { memo } from 'react'
import icon from '../utils/icon';
import { HoverItem } from './'

const Section = ({data,flag}) => {

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
                {dataItem && dataItem.slice(0, 5).map(item =>
                    <HoverItem key={item.encodeId} encodeId={item?.encodeId}
                        thumbnailM={item?.thumbnailM} title={item?.title}
                        sortDescription={item?.sortDescription} link={item?.link} />
                )}
            </div>
        </div>
    )
}

export default memo(Section);
