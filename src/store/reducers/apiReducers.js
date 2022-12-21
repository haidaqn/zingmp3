import actionType from "../actions/actionType";

const initState = {
    homeData : []
}

const apptReducer = (state = initState , action) => {
    switch (action.type) {
        case actionType.GET_HOME:
            return state;
        default:
            return;
    }
}

export default apptReducer;