import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';

const Chart = ({dayData}) => {

    let time = [];
    let temp = [];

    for(let i=0; i<dayData.length; i++){
        time.push(dayData[i].dateTime.hours +" "+ dayData[i].dateTime.AmOrPm);
        temp.push(dayData[i].main.temp);
    }

    if(time.length === 0){
        time = ["12 AM", "12 PM"]
    }

    if(temp.length === 0 ){
        temp = [0, 0]
    }

    const [state, setState] = useState({
        charDate: {}
    });

    useEffect(() => {
        const ctx = document.getElementById('canvas').getContext("2d")
        const gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, 'rgba(96, 165, 250)')
        gradient.addColorStop(1, '#FFFFFF')
        const newData = {
            labels: time,
            datasets: [
                {
                    label: 'usd',
                    data: temp,
                    backgroundColor: gradient,
                    borderColor: 'rgba(96, 165, 250)',
                    borderWidth: 1,
                    pointColor : "#fff",
                    pointHighlightFill: "#fff",
                    pointBorderColor : "rgba(59, 130, 246)",
                },
            ]

        }
        setState({chartData: newData})
    },[dayData])

    return <div>
        <Line
            id={"canvas"}
            data={state.chartData}
            height={500}
            options={{
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function(tooltipItem, data) {
                            return `temp: ${data['datasets'][0]['data'][tooltipItem['index']]} °C`;
                        }
                    },
                    backgroundColor: 'rgba(255, 255, 254, 0.9)',
                    borderWidth: 1,
                    borderColor: 'rgba(209, 213, 219)',
                    titleFontSize: 16,
                    titleFontColor: '#000',
                    bodyFontColor: 'rgba(59, 130, 246)',
                    bodyFontSize: 14,
                    displayColors: false
                }
            }}
        />
    </div>
}

export default Chart;