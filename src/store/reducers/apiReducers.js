import actionType from "../actions/actionType";

const initState = {
    homeData: [],
    test :  " Hello 123"
}

const apptReducer = (state = initState , action) => {
    switch (action.type) {
        case actionType.GET_HOME:
            return state;
        default:
            return state;
    }
}

export default apptReducer;