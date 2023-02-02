import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArrSlider } from '../utils/fn';
import * as actions from '../store/actions';
import { useNavigate } from 'react-router-dom';

const Slider = () => {

    const navigate = useNavigate();
    const { banner } = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        const sliderEls = document.getElementsByClassName('slider-item')
        let min = 0
        let max = 2
        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEls.length - 1)
            for (let i = 0; i < sliderEls.length; i++) {
                // Delete classnames (css)
                sliderEls[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-20')
                sliderEls[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-10')
                sliderEls[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-10')

                if (list.some(item => item === i)) {
                    sliderEls[i].style.cssText = `display: block`
                } else {
                    sliderEls[i].style.cssText = `display: none`
                }
            }
            list.forEach(item => {
                if (item === max) {
                    sliderEls[item]?.classList?.add('animate-slide-right', 'order-last', 'z-20')
                } else if (item === min) {
                    sliderEls[item]?.classList?.add('animate-slide-left', 'order-first', 'z-10')
                } else {
                    sliderEls[item]?.classList?.add('animate-slide-left2', 'order-2', 'z-10')
                }
            })
            min = (min === sliderEls.length - 1) ? 0 : min + 1
            max = (max === sliderEls.length - 1) ? 0 : max + 1
        }, 3000)
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, []);

    const handleClickBanner = (item) => {
        if (item?.type === 1) { // bài nhạc
            dispatch(actions.setCurSongId(item?.encodeId));
            dispatch(actions.playAlbum(false));
            dispatch(actions.play(false));
            dispatch(actions.setPlayList(null));
        }
        else if (item?.type === 4) { // album
            const albumPath = item?.link.split('.')[0];
            dispatch(actions.playAlbum(true));
            navigate(albumPath);
        }   
        else {
            dispatch(actions.setPlayList(null));
            dispatch(actions.playAlbum(false));
        } 
    };

  return (
    <div className='w-full overflow-hidden'>
            <div className='flex w-full gap-8 pt-8'>
                {banner?.map((item, index) => (
                    <img
                        alt="ảnh"
                        key={item.encodeId}
                        src={item.banner}
                        onClick={() => handleClickBanner(item)}
                        className={`slider-item flex-1 object-contain w-[30%] rounded-lg cursor-pointer ${index <= 2 ? 'block' : 'hidden'}`}
                    />
                ))}
            </div>
        </div>
  )
}

export default Slider
