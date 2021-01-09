

const DayString = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const convertUnixToTimestamp = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000);
    const monthDay = date.getDate();
    let hours = date.getHours();
    const day = date.getDay();
    const minutes = date.getMinutes();
    // const seconds = "0" + date.getSeconds();
    // const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    const AmOrPm = hours > 12 ? 'PM': 'AM';
    hours = hours > 12 ? hours-12: hours;
    return {
        monthDay,
        day: DayString[day],
        hours,
        minutes,
        AmOrPm
    };
}

export const getFormattedList = (list) => {
    for(let i=0; i<list.length; i++) {
        list[i] = {...list[i], dateTime: convertUnixToTimestamp(list[i].dt)}
    }
    return list;
}

export const groupListByDay = (list) => {
    const groupedData = [[list[0]]];
    let j=0;
    for(let i=1; i<list.length; i++){
        if(list[i].dateTime.day === list[i-1].dateTime.day){
            groupedData[j].push(list[i]);
        }else {
            j++;
            groupedData[j] = [];
            groupedData[j].push(list[i]);
        }
    }
    return groupedData;
}

export const getIconUrl = (condition, icon) => {
    switch (condition){
        case "Clouds":
            return "/cloudy.svg";
        case "Clear":
            return "/clear.svg";
        case "Rain":
            return "/rain.svg";
        case "Mist":
            return "/mist.svg";
        case "Haze":
            return "/mist.svg"
        case "Fog":
            return "/mist.svg"
        default:
            return `http://openweathermap.org/img/w/${icon}.png`
    }
}


let timer;

export const debounce = function (callback, delay){
    return function (){
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(context);
        }, delay);
    }
}