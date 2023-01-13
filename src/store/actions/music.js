import * as apis from '../../apis';
import actionTypes from './actionType';


export const setCurSongId = (songId) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    songId,  
})

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag,  
})

export const playAlbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag,  
})

export const setPlayList = (songs) => ({
    type: actionTypes.PLAY_LIST,
    songs  
})
/* 
export const fetchDetailPlaylist = (pid) => async (dispatch) => {
    try {
        const response = await apis.apiGetDeTailPlayList(pid);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.PLAY_LIST,
                songs : response?.data?.data?.song?.items
            })            
        }
    }
    catch (err) {
        dispatch({
            type: actionTypes.PLAY_LIST,
            songs : null
        })
    }
} */