import {cities} from '../../cities';
import {CITIES_FAILED, CITIES_REQUEST, CITIES_SUCCESS, CLEAR_CITIES} from "../constants/citiesConstants";

const searchCity = (key) => {
    const searchedCities = [];
    for(let i=0; i<cities.length; i++){
        let index = cities[i].name.toLowerCase().indexOf(key.toLowerCase())
        if(index >= 0){
            const initialPart = cities[i].name.substr(0, index);
            const remainingPart = cities[i].name.substr(index+key.length);
            searchedCities.push({...cities[i], initialPart, searchPart: key.toLowerCase(), remainingPart});
        }
    }
    return searchedCities;
}

export const fetchCity = (stringKey = '') => dispatch => {
    try{
        dispatch({type: CITIES_REQUEST});
        const cities = searchCity(stringKey).slice(0, 5);
        dispatch({type: CITIES_SUCCESS, payload: cities})
    }catch (err){
        dispatch({type: CITIES_FAILED, payload: "Error Fetching cities"})
    }
}

export const clearCity = () => dispatch => {
    dispatch({type: CLEAR_CITIES})
}