import React from "react";
import {getIconUrl} from "../utils/helper";

const WeatherDayItem = ({day, minTemp, maxTemp, condition, active=false, index, icon}) => {

    minTemp = (""+minTemp).split(".")[0];
    maxTemp = (""+maxTemp).split(".")[0];

    return <div data-id={index} className={`flex flex-col items-center space-y-1 transition duration-300 ${active && "bg-yellow-50 ring-2"} hover:bg-yellow-50 px-4 cursor-pointer py-2`}>
            <span className={"text-sm"}>{day}</span>
            <span className={"space-x-2 text-sm"}><span>{maxTemp}&deg;</span><span className={"text-gray-400"}>{minTemp}&deg;</span></span>
            <img className={"w-6 h-6"} src={getIconUrl(condition, icon)} alt={"sunny"}/>
            <span className={"text-xs text-gray-500"}>{condition}</span>
        </div>
}

export default WeatherDayItem;