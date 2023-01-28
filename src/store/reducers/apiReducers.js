import actionType from "../actions/actionType";

const initState = {
    banner: [],
    friday: {},
    newEveryday: {},
    top100: {},
    xone: {},
    isLoading : false,
}

const apptReducer = (state = initState , action) => {
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === "hSlider")?.items || null,
                friday : action.homeData?.find(item => item.sectionId === "hAutoTheme1") || {},
                newEveryday : action.homeData?.find(item => item.sectionId === "hAutoTheme2") || {},
                top100 : action.homeData?.find(item => item.sectionId === "h100") || {},
                xone : action.homeData?.find(item => item.sectionId === "hXone") || {},
            };
        case actionType.LOADING: 
            return {
                ...state,
                isLoading : action.flag
            }
        default:
            return state; 
    }
}

export default apptReducer;