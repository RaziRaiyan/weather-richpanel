import {cities} from '../../cities';
import {CITIES_FAILED, CITIES_REQUEST, CITIES_SUCCESS, CLEAR_CITIES} from "../constants/citiesConstants";
import {debounce} from "../../utils/helper";
import axios from "axios";

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
        const debouncedSearch = debounce(async function (){
            let cities = searchCity(stringKey).slice(0, 3);
            let cityData = await Promise.all(cities.map(city => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=f1d018fc69c1f0b869d78994c6920c99`)));
            for(let i=0; i<cities.length; i++){
                console.log(cityData[i].data);
                cities[i].condition = cityData[i].data.weather[0].main;
                cities[i].temp = cityData[i].data.main.temp;
                cities[i].icon = cityData[i].data.weather[0].icon;
            }
            dispatch({type: CITIES_SUCCESS, payload: cities})
        }, 700);
        debouncedSearch();
    }catch (err){
        dispatch({type: CITIES_FAILED, payload: "Error Fetching cities"})
    }
}

export const clearCity = () => dispatch => {
    dispatch({type: CLEAR_CITIES})
}