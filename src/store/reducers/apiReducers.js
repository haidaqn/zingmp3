import actionType from "../actions/actionType";

const initState = {
    banner: [],
    friday : {},
}

const apptReducer = (state = initState , action) => {
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === "hSlider")?.items || null,
                friday : action.homeData?.find(item => item.sectionId === "hAutoTheme1") || {},
            };
        default:
            return state;
    }
}

export default apptReducer;