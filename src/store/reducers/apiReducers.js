import actionType from "../actions/actionType";

const initState = {
    banner: [],
}

const apptReducer = (state = initState , action) => {
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionType === "banner")?.items || null,
            };
        default:
            return state;
    }
}

export default apptReducer;