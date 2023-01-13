import apptReducer from "./apiReducers";
import { combineReducers, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import musicReducer from "./musicReducers";

const commonConfig = {
    storage,
    stateReconciler : autoMergeLevel2
}

const musicConfig = {
    ...commonConfig,
    key : 'music',
    whileList : ['currentSongId']
}

const rootReducer = combineReducers({
    app: apptReducer,
    music : persistReducer(musicConfig,musicReducer),
})

export default rootReducer;