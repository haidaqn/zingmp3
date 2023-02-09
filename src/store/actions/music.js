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

export const setSource = (flag) => ({
    type: actionTypes.LOADED_SOURCE,
    flag  
})

export const loading = (flag) => ({
    type: actionTypes.LOADING,
    flag  
})

export const setCurrentSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data  
})

export const setAlbumSongData = (id) => ({
    type: actionTypes.SET_ALBUM_SONG_DATA,
    id  
})
export const setRecent = (data) => ({
    type: actionTypes.SET_RECENT,
    data
})
