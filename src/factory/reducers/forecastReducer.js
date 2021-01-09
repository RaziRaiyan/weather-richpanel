import {CHANGE_ACTIVE_INDEX, FORECAST_FAILED, FORECAST_REQUEST, FORECAST_SUCCESS} from "../constants/forecastConstants";

export const forecastListReducer = (state={data:{}, loading: true, error: false}, action) => {
    switch (action.type){
        case FORECAST_REQUEST:
            return {...state, loading: true}
        case FORECAST_SUCCESS:
            return {...state, loading: false, error: false, data: action.payload}
        case FORECAST_FAILED:
            return {...state, loading: false, error: action.payload}
        case CHANGE_ACTIVE_INDEX:
            state.data.activeDay = parseInt(action.payload);
            return {...state, data: state.data}
        default:
            return state;
    }
}