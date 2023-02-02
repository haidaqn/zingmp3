import React, { useEffect ,useState } from 'react';
import { useSelector } from 'react-redux';
import icon from '../utils/icon';
import SongItem from './SongItem';


const Release = () => {

    const { newRelease } = useSelector(state => state.app);
    const { FiChevronRight } = icon;
    const [isActived, setIsActived] = useState(true);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        isActived ? setSongs(newRelease?.items?.vPop) : setSongs(newRelease?.items?.others);
    }, [isActived,newRelease]);

    //
    return (
        <div  className='mt-12 text-white mb-5 flex flex-col gap-5'>
            <div className='flex items-center justify-between text-white gap-5'>
                <h1 className='text-5 font-bold'>{newRelease?.title}</h1>
                <span className='text-xs flex items-center justify-center'>TẤT CẢ<FiChevronRight size={20}/></span>
            </div>
            <div className='flex gap-5 items-center text-xs'>
                <button onClick={()=> setIsActived(true)} className={`py-1 px-4 rounded-l-full rounded-r-full border hover:opacity-90 ${isActived && 'bg-[#9b4de0] border-[#9b4de0]'}`} type='button'>
                    VIỆT NAM  
                </button>
                <button onClick={()=> setIsActived(false)}  className={`py-1 px-4 rounded-l-full rounded-r-full border hover:opacity-90 ${!isActived && 'bg-[#9b4de0] border-[#9b4de0]'}`} type='button'>
                    QUỐC TẾ
                </button>
            </div>
            <div className='flex flex-wrap gap-4 w-full'>
                {songs?.slice(0, 9)?.map(item => (
                    <SongItem item={item} key={item?.encodeId}
                        thumbnail={item.thumbnail} title={item.title}
                        artists={item.artistsNames} releaseDate={item.releaseDate} 
                        idSong={item.encodeId}
                    />
                ))}
            </div>
        </div>
    )
}

export default Release
