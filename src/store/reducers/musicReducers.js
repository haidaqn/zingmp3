/* eslint-disable no-undef */
import actionType from "../actions/actionType";

const initState = {
    currentSongId: null,
    currentSongData: null,
    isPlaying: false,
    atAlbum: false,
    songs: null,
    isLoadedSource: true,
    albumId: null,
    recentSongs : []
}

const musicReducer = (state = initState , action) => {
    switch (action.type) {
        case actionType.SET_CUR_SONG_ID:
            return {
                ...state,
                currentSongId: action?.songId || null,
            }
        case actionType.PLAY: 
            return {
                ...state,
                isPlaying : action?.flag 
            }
        case actionType.SET_ALBUM: 
            return {
                ...state,
                atAlbum : action?.flag 
            }
        case actionType.PLAY_LIST: 
            return {
                ...state,
                songs : action?.songs || null
            }
        case actionType.LOADED_SOURCE: 
            return {
                ...state,
                isLoadedSource : action?.flag
            }
        case actionType.SET_CUR_SONG_DATA:
            return {
                ...state,
                currentSongData: action?.data || null
            }
        case actionType.SET_ALBUM_SONG_DATA:
            return {
                ...state,
                albumId: action?.id || null
            }
        case actionType.SET_RECENT:

            let songs = state.recentSongs;
            if (action?.data) {
                if(songs?.some(item => item.idSong === action.data.idSong)) 
                    songs = songs.filter(item => item.idSong !== action.data.idSong) 
            }
            songs = [action.data, ...songs];
            
            console.log(songs);

            return {
                ...state,
                recentSongs: songs
                // action.data ? [ action.data, ...state.recentSongs ] : state.recentSongs
            }
        default:
            return state;
    }
}

export default musicReducer;