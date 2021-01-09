import {Line} from "react-chartjs-2";
import React, {useEffect, useState} from "react";

const Sunchart = ({sunrise, sunset}) => {

    const [state, setState] = useState({
        chartData: []
    });

    const minX = -2;
    const maxX = 12;
    const interpolatedData = new Array(maxX-minX+1);
    const xVals = [];
    let current = minX;
    let step = 1;
    for(let i=0; i<interpolatedData.length; i++){
        interpolatedData[i] = 2*Math.cos(0.1*Math.PI*(current-5));
        xVals.push(current);
        current += step;
    }

    // const getDarkTime = (suntime, toAdd) => {
    //     const hour = parseInt(suntime.split(":")[0]);
    //     if(toAdd){
    //         return `${hour+1}:00 PM`
    //     }else {
    //         return `${hour-1}:00 AM`
    //     }
    // }

    const getChartHeight = () => {
        const innerWidth = window.innerWidth;
        if(innerWidth > 500){
            return 200;
        }else if(innerWidth > 400){
            return 180;
        }else {
            return 160;
        }
    }

    // const height = getChartHeight();
    //
    // const getPosition = () => {
    //     return {
    //         x: xVals[6],
    //         y: interpolatedData[6]*height
    //     }
    // }


    useEffect(() => {
        const ctx = document.getElementById('canvas').getContext("2d")
        const gradient = ctx.createLinearGradient(0, 0, 0, 200)
        gradient.addColorStop(0, '#ffcc80')
        gradient.addColorStop(0.2, 'rgba(253, 230, 138)')
        gradient.addColorStop(0.4, 'rgba(255, 251, 235)')
        gradient.addColorStop(0.46, 'rgba(255, 251, 235)')
        gradient.addColorStop(0.46, "rgba(107, 114, 128)")
        gradient.addColorStop(0.5, 'rgba(107, 114, 128)');
        let flag = true;
        const newData = {
            // labels: [getDarkTime(sunrise, false), sunrise, '', '', '','', sunset, getDarkTime(sunset, true)],
            labels: interpolatedData.map(item => {
                let label = '';
                item = Math.round(item);
                if(item === 0){
                    label =  flag ? sunrise : sunset;
                    flag = false;
                }
                return label;
            }),
            datasets: [
                {
                    label: 'sun',
                    data: interpolatedData,
                    backgroundColor: gradient,
                    borderColor: 'rgba(251, 191, 36)',
                    borderWidth: 1,
                },

            ]

        }
        setState({chartData: newData})
    }, [])

    return <div>
        <Line
            id={"canvas"}
            data={state.chartData}
            height={200}
            options={{
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius: 0
                    }
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }],
                }
            }}
        />
    </div>
}

export default Sunchart;