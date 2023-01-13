import actionType from "../actions/actionType";

const initState = {
    currentSongId: null,
    isPlaying: false,
    atAlbum: false,
    songs : null 
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
        default:
            return state;
    }
}

export default musicReducer;