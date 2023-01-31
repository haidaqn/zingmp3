import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apis from '../../apis';
import moment from 'moment';
import { Lists , LoadingAudio } from '../../components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import icons from '../../utils/icon';

const Album = () => {

    const {BsFillPlayFill} = icons;
    const { pid } = useParams();
    const { isPlaying,isLoadedSource } = useSelector(state => state.music);
    const [playListData, setPLayListData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            dispatch(actions.loading(true));
            const response = await apis.apiGetDeTailPlayList(pid);
            dispatch(actions.loading(false));
            if (response?.data.err === 0) {
                setPLayListData(response.data?.data);
                dispatch(actions.setPlayList(response.data?.data?.song?.items));
            }
            else {
                console.log("Lỗi ở fetchDetailPlaylist Album ")
            }
        }
        fetchDetailPlaylist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid])

    return (
        <div className='flex relative gap-8 w-full pt-8 animate-scale-center'>
            <div className='flex-none w-[300px] text-white'>
                <div className='w-full relative overflow-hidden hover:scale-120'>
                    <img className={`w-full object-contain ${ isLoadedSource ? 'animate-img-rotate-pause rounded-md' : 'rounded-full animate-img-rotate'}`}
                        alt="thumbnail" src={playListData?.thumbnailM} />
                    <div className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center hover:bg-[rgba(0,0,0,0.3)] ${isPlaying && 'rounded-full'}`}>
                        <div className='p-[10px] border border-white rounded-full'>
                            {isLoadedSource ? <BsFillPlayFill size={35} /> : <LoadingAudio />} 
                        </div>
                    </div>
                </div>
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
