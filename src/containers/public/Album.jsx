import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apis from '../../apis';
import moment from 'moment';
import { Lists } from '../../components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';


const Album = () => {

    const { pid } = useParams();
    const [playListData, setPLayListData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const response = await apis.apiGetDeTailPlayList(pid)
            if (response?.data.err === 0) {
                setPLayListData(response.data?.data);
                dispatch(actions.setPlayList(response.data?.data?.song?.items));
            }
            else {
                console.log("Lỗi ở fetchDetailPlaylist Album ")
            }
        }
        fetchDetailPlaylist()
    }, [pid])

    return (
        <div className='flex gap-8 w-full pt-8 '>
            <div className='flex-none w-[300px] text-white'>
                <img className='w-full  object-contain rounded-md' alt="thumbnail" src={ playListData?.thumbnailM} />
                <div className='mt-3 flex justify-center items-center'>
                    <div className='text-center'>
                        <h1 className='font-bold text-[20px]'>{playListData?.title}</h1>
                        <p className='text-[12px] text-[hsla(0,0%,100%,0.5)]'>Cập nhật: {moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}</p>
                        <p className='text-[12px] text-[hsla(0,0%,100%,0.5)]'>{playListData?.artistsNames}</p>
                        <p className='text-[12px] text-[hsla(0,0%,100%,0.5)]'>{ Math.floor(playListData?.like/1000) }K người yêu thích</p>
                    </div>
                </div>
            </div>
            <Scrollbars style={{ width: '100%', height: 550 }}>  
                <div className='flex-auto mb-40'>
                    <span className='text-sm'>
                        <span className='text-[hsla(0,0%,100%,0.5)]'>Lời tựa </span>
                        <span className='text-white'>{playListData?.sortDescription}</span>
                    </span>
                    <Lists totalDuration={playListData?.song?.totalDuration} />
                </div>
            </Scrollbars>
        </div>
    )
}

export default Album
