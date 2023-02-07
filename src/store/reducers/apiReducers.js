import actionType from "../actions/actionType";

const initState = {
    banner: [],
    friday: {},
    newEveryday: {},
    top100: {},
    xone: {},
    isLoading: false,
    newRelease: {},
    newChart: [],
    chart : {},
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
                newRelease : action.homeData?.find(item => item.sectionType === "new-release") || {},
                newChart: action.homeData?.find(item => item.sectionType === "weekChart")?.items || [],
                chart : action.homeData?.find(item => item.sectionId === 'hZC') || {},
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