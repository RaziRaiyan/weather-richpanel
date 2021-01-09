import {CITIES_FAILED, CITIES_REQUEST, CITIES_SUCCESS, CLEAR_CITIES} from "../constants/citiesConstants";

export const searchCityReducer = (state={cities:[], loading: true, error: false}, action) => {
    switch (action.type){
        case CITIES_REQUEST:
            return {...state, loading: true, error: false}
        case CITIES_SUCCESS:
            return {...state, loading: false, error: false, cities: action.payload}
        case CITIES_FAILED:
            return {...state, loading: false, error: action.payload}
        case CLEAR_CITIES:
            return {...state, loading: false, error: false, cities: []}
        default:
            return state
    }
}