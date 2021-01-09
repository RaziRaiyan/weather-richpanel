import React, {useEffect, useRef, useState} from "react";
import {clearCity, fetchCity} from '../factory/actions/cityActions'
import {useDispatch, useSelector} from "react-redux";
import {listForecast} from "../factory/actions/forecastActions";
import {getIconUrl} from "../utils/helper";

const Searchbar = () => {

    const dispatch = useDispatch();
    const searchCityState = useSelector(state => state.searchCityState);
    const forecastState = useSelector(state => state.forecastState);

    let city = forecastState.data.city ? forecastState.data.city.name : '';
    let state = forecastState.data.city ? forecastState.data.city.state : '';

    const [selectedCity, setSelectedCity] = useState(city);

    useEffect(() => {
        if(city && state){
            setSelectedCity(`${city}, ${state}`);
        }else if(city){
            setSelectedCity(`${city}`);
        }
    }, [city])

    const {cities} = searchCityState;

    let searchRef = useRef(null);

    const handleCitySearch = (event) => {
        setSelectedCity(event.target.value);
        if(searchRef.current.value && searchRef.current.value.length >= 3) {
            dispatch(fetchCity(searchRef.current.value));
        }else if(cities.length > 0){
            dispatch(clearCity());
        }
    }

    const handleCityClick = (event) => {
        event.preventDefault();
        const target = event.target.closest("div[data-city]");
        city = target ? target.attributes['data-city'].value : null;
        state = target ? target.attributes['data-state'].value : null;
        if(city){
            setSelectedCity(`${city}, ${state}`)
            dispatch(listForecast(city, state));
            dispatch(clearCity())
        }
    }

    const handleLocationSearch = (event) => {
        event.preventDefault();
        if(forecastState.loading)
            return ;
        setSelectedCity(``);
        dispatch(listForecast(null))
    }

    const handleSearchCityClick = (event) => {
        event.preventDefault();
        if(forecastState.loading)
            return ;
        setSelectedCity(``);
        dispatch(clearCity());
        dispatch(listForecast(searchRef.current.value))
    }

    return <div className={"flex items-center w-full"}>
        <button className={"focus:outline-none z-20"} onClick={handleLocationSearch}>
            <svg className={"w-6 h-6 transform translate-x-8"}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
        </button>
        <div className={"relative w-full my-4 "}>
            <input onChange={handleCitySearch} value={selectedCity} ref={searchRef} type={"text"} className={"w-full shadow-cell transition duration-500 rounded-lg px-10 py-3 focus:outline-none focus:ring-1 focus:shadow-cellLg"}/>
            {
                cities.length > 0 &&
                    <div onClick={handleCityClick} className={"w-full z-40 absolute top-12 rounded-lg flex flex-col shadow-cellLg bg-white divide-y cursor-pointer"} style={{marginTop: "2px"}}>
                        {cities.map((city, index) => {
                            return <div data-city={city.name} data-state={city.state} className={`p-2 transition duration-300 hover:bg-gray-100 ${index === 0 && "rounded-t-lg"} ${index === cities.length-1 && "rounded-b-lg"}`} key={index} >
                                <div className={"flex items-center flex justify-between items-center animate-moveY"}>
                                    <div><span>{city.initialPart}</span><span className={"font-bold"}>{city.searchPart}</span><span>{city.remainingPart}</span>, <span className={"text-gray-500 text-sm"}>{city.state}</span></div>
                                    <div className={"flex items-center"}>
                                        <div className={"flex flex-col "}>
                                            <span className={"font-bold text-sm"}>{(city.temp+"").split(".")[0]}&deg; C</span><span className={"text-gray-500 text-xs"}>{city.condition}</span>
                                        </div>
                                        <img src={getIconUrl(city.condition, city.icon)} alt={""} className={"h-6 w-6 ml-4"}/>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
            }
        </div>
        <button onClick={handleSearchCityClick} className={"focus:outline-none"}>
            <svg className={"w-6 h-6 transform -translate-x-8 z-20"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
    </div>

}

export default Searchbar;
