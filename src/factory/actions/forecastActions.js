import {CHANGE_ACTIVE_INDEX, FORECAST_FAILED, FORECAST_REQUEST, FORECAST_SUCCESS} from "../constants/forecastConstants";
import axios from "axios";
import {getFormattedList, groupListByDay} from "../../utils/helper";

export const listForecast = (city = null, state = null) => async (dispatch) => {
    try{
        dispatch({type: FORECAST_REQUEST});
        if(!city){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const {latitude, longitude} = position.coords;
                        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=f1d018fc69c1f0b869d78994c6920c99`
                        const {data} = await axios.get(url);
                        data.activeDay = 0;
                        data.list = getFormattedList(data.list);
                        data.list = groupListByDay(data.list);
                        dispatch({type: FORECAST_SUCCESS, payload: data});
                    },
                    function(){
                        alert('Could not get your coordinates');
                        dispatch({type: FORECAST_FAILED, payload: "Could not get your coordinates"});
                    }
                )
            }
        }else{
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=f1d018fc69c1f0b869d78994c6920c99`;
            const {data} = await axios.get(url);
            data.activeDay = 0;
            data.city.state = state;
            data.list = getFormattedList(data.list);
            data.list = groupListByDay(data.list);
            dispatch({type: FORECAST_SUCCESS, payload: data});
        }
    }catch (err){
        dispatch({type: FORECAST_FAILED, payload: err});
    }
}

export const selectDay = (dayIndex = 0) => dispatch => {
    dispatch({type: CHANGE_ACTIVE_INDEX, payload: dayIndex})
}