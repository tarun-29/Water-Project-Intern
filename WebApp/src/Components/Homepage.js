import React from 'react';
import * as tf from "@tensorflow/tfjs"
import { Scatter } from 'react-chartjs-2';
import d from "../data/water.json"


const modelUrl = "https://raw.githubusercontent.com/tarun-29/Water-Project-Intern/master/tfjs/model.json"
const model = async () => {
    await tf.loadLayersModel(modelUrl).then(m => {
        // data = tf.tensor2d([30.6, 7.5], [1, 2])
        // console.log(m.predict(tf.ones([30.6], [7.5])))
        var results = m.predict(tf.tensor2d([28, 5], [1, 2]));
        console.log(results.dataSync())
    })
}

const options = {
    legend: {
        labels: {
            fontColor: "white",
            fontSize: 18
        }
    },
    responsive: true,
    title: {
        display: true,
        text: 'Chart.js Line Chart',
        fontColor: "white",
        fontSize: 15,
    },
    tooltips: {
        mode: 'label',
    },
    hover: {
        mode: 'nearest',
        intersect: true
    },
    scales: {
        xAxes: [{
            ticks: {
                fontColor: "white",
                fontSize: 15,
            },
            display: true,
            gridLines: {
                display: false,
            },
            scaleLabel: {
                display: true,
                labelString: 'Month',
                fontColor: "white",
                fontSize: 15
            }
        }],
        yAxes: [{
            ticks: {
                fontColor: "white",
                fontSize: 15,
            },
            display: true,
            gridLines: {
                display: false,
            },
            scaleLabel: {
                display: true,
                labelString: 'Value',
                fontColor: "white",
                fontSize: 15
            }
        }]
    }
}

const gridLines = {
    display: false,
    color: "#FFFFFF"
}

const data1 = [
    { x: 65, y: 75 },
    { x: 59, y: 49 },
    { x: 80, y: 90 },
    { x: 81, y: 29 },
    { x: 56, y: 36 },
    { x: 55, y: 25 },
    { x: 40, y: 18 },
]

const data2 = [
    { x: 65, y: 75 },
    { x: 59, y: 49 },
    { x: 80, y: 90 },
    { x: 81, y: 29 },
    { x: 56, y: 36 },
    { x: 55, y: 25 },
    { x: 40, y: 18 },
]

const Temp = {
    
    labels: ['Scatter'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data:data1
        }
    ]
};

const ph = {
    
    labels: ['Scatter'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data:data2
        }
    ]
};

function Homepage() {
    console.log("Predictions**************************")
    model()
    return (
        <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around" }} class="container">
            <div>
                <div style={{ display: "flex", flexDirection: 'column', justifyContent: "space-around" }}>
                    <div >
                        <Scatter data={Temp} options={options} height={300} width={400} />
                    </div>
                    <div >
                        <Scatter data={ph} options={options} height={300} width={400} />
                    </div>
                </div>
            </div>
            <div>from here</div>
        </div>
    );
}

export default Homepage;
