import rootReducer from './store/reducers/rootReducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducerConfig = () => {
    const store = createStore(rootReducer,applyMiddleware(thunk));
    return store;
}

export default reducerConfig;