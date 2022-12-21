import apptReducer from "./apiReducers";
import { combineReducers, applyMiddleware } from 'redux';

const rootReducer = combineReducers({
    app: apptReducer,
})

export default rootReducer;