import React, {useEffect, useRef} from 'react';
import Chart from "./components/Chart";
import {useDispatch, useSelector} from "react-redux";
import {listForecast, selectDay} from "./factory/actions/forecastActions";
import WeatherDayItem from "./components/WeatherDayItem";
import {convertUnixToTimestamp, getIconUrl} from "./utils/helper";
import Searchbar from "./components/Searchbar";
import Sunchart from "./components/Sunchart";

function App() {

    const dispatch = useDispatch();
    const forecastState = useSelector(state => state.forecastState);
    const {loading, error, data} = forecastState;

    useEffect(() => {
        dispatch(listForecast(null));
    }, []);

    const handleDayClick = (event) => {
        event.preventDefault();
        const target = event.target.closest("div[data-id]");
        const index = target ? target.attributes['data-id'].value : null;
        if(index){
            dispatch(selectDay(index));
        }
    }

    const getSunriseTime = () => {
        if(!data.city)
            return '';
        const dateTime = convertUnixToTimestamp(data.city.sunrise);
        return `${dateTime.hours}:${dateTime.minutes} ${dateTime.AmOrPm}`;
    }

    const getSunsetTime = () => {
        if(!data.city)
            return '';
        const dateTime = convertUnixToTimestamp(data.city.sunset);
        return `${dateTime.hours}:${dateTime.minutes} ${dateTime.AmOrPm}`;
    }

    const renderLoader = () => {
        return <div className={"w-full flex justify-center py-12"}>
            <img className={"h-24 w-24 animate-spin"} src={"/loading.svg"} alt={"Loader"}/>
        </div>
    }

    const renderUI = () => {
        return <>
            <div className={"flex justify-between lg:mx-12 overflow-x-scroll space-x-4 py-2 px-2"} onClick={handleDayClick}>
                {data.list.map((item, index) => {
                    return <WeatherDayItem key={index} active={index === data.activeDay} day={item[0].dateTime.day} maxTemp={item[0].main.temp_min} minTemp={item[0].main.temp_max} condition={item[0].weather[0].main} index={index} icon={item[0].weather[0].icon}/>
                })}
            </div>
            <div className={"flex flex-col lg:flex-row m-4 rounded-lg shadow-cellLg p-4 items-center"}>
                <div className={"w-full lg:w-1/2"}>
                    <div className={"flex items-center ml-8 mb-4"}>
                        <div className={"text-4xl font-bold"}>{data.list ? data.list[data.activeDay][0].main.temp+"°C" : ""}</div>
                        <img className={"w-12 h-12 ml-4"} src={getIconUrl(data.list[data.activeDay][0].weather[0].main)} alt={"sunny"}/>
                    </div>
                    <Chart dayData={data.list ? data.list[data.activeDay] : []}/>
                </div>
                <div className={"w-full lg:w-1/2"}>
                    <div className={"flex space-x-2 text-sm w-full mt-4"}>
                        <div className={"flex flex-col p-2 rounded bg-blue-50 w-1/2"}><span className={"font-bold"}>Pressure</span><span>{data.list ? data.list[0][0].main.pressure+" hpa" : ''}</span></div>
                        <div className={"flex flex-col p-2 rounded bg-blue-50 w-1/2"}><span className={"font-bold"}>Humidity</span><span>{data.list ? data.list[0][0].main.humidity+"%" : ''}</span></div>
                    </div>
                    <div className={"flex space-x-2 text-sm w-full my-4 justify-between"}>
                        <div className={"flex flex-col p-2"}><span className={"font-bold"}>Sunrise</span><span className={"text-xs text-gray-500"}>{getSunriseTime()}</span></div>
                        <div className={"flex flex-col p-2"}><span className={"font-bold"}>Sunset</span><span className={"text-xs text-gray-500"}>{getSunsetTime()}</span></div>
                    </div>
                    <Sunchart sunrise={getSunriseTime()} sunset={getSunsetTime()}/>
                </div>
            </div>
        </>
    }

    const renderError = () => {
        return<div className={"w-full flex flex-col justify-center text-gray-600 px-8 items-center mt-8"}>
            <div className={"text-8xl"}>Error!</div>
            <div className={"text-4xl mt-4"}>Cannot find weather info for your city</div>
            <div className={"mt-4"}>Please try a different city or come back later</div>
        </div>
    }

  return (
    <div className="container mx-auto text-gray-800 font-montserrat">
        <Searchbar/>
        {
            loading ? renderLoader() : (error ? renderError() : renderUI())
        }
    </div>
  );
}

export default App;
