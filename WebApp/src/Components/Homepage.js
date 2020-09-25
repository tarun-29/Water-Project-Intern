import React, { useState } from 'react';
import * as tf from "@tensorflow/tfjs"
import { Scatter } from 'react-chartjs-2';
// import d from "../data/water.json"
import facts from "../data/facts.json"
import { constraints } from '@tensorflow/tfjs';


const modelUrl = "https://raw.githubusercontent.com/tarun-29/Water-Project-Intern/master/tfjs/model.json"
const model = async (temp, ph, setAns) => {
    console.log("hello babes")
    return await tf.loadLayersModel(modelUrl).then(m => {
        if (parseFloat(temp) && parseFloat(ph)) {
            if (temp === 0 || ph === 0) {
                alert("Please enter valid values")
                return
            }
            else {
                var dat = [parseFloat(temp), parseFloat(ph)]
                var shap = [1, 2]
                var results = m.predict(tf.tensor2d(dat, shap));
                //  console.log(results.dataSync())
                Promise.resolve(results.dataSync()).then(s => {
                    setAns(s)
                })
            }
        }
        else{
            alert("Enter numeric value")
            return
        }

    })
}

async function promiseResolve(func) {
    let value = await func;
    if (value > 1) {
        return value
    } else {
        return value + " is not greater than 1"
    }
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
        // text: 'Chart.js Line Chart',
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
            label: 'PH vs D.O(mg/L)',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'yellow',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: data1
        }
    ]
};

const ph = {
    labels: ['Scatter'],
    datasets: [
        {
            label: 'Temp vs D.O(mg/L)',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            // pointBorderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'yellow',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: data2
        }
    ]
};

function Homepage() {
    const [count, setCount] = useState(0);
    const [temp, setTemp] = useState(0);
    const [PH, setPH] = useState(0);
    const [ans, setAns] = useState(0);
    return (
        <div style={{ color: "white", textAlign: 'center', fontSize: 25 }}>Water Quality Model
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around" }} className="container">
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
                <div style={{ display: "flex", flexDirection: 'column', justifyContent: "space-between" }}>

                    <div style={{ marginTop: 20 }} className="card-form">
                        <form className="signup">
                            <div className="form-title">Predictions of D.O(mg/L)</div>
                            <div className="form-body">
                                <div className="row">
                                    <input onChange={(e) => setTemp(e.target.value)} type="text" placeholder="Water Temp" />
                                </div>
                                <div className="row">
                                    <input onChange={(e) => setPH(e.target.value)} type="text" placeholder="Water pH" />
                                </div>
                            </div>
                            <div className="rule"></div>
                            <div className="form-footer" style={{ display: "flex", flexDirection: 'row' }}>
                                <a href="/#" onClick={async () => { console.log(await model(temp, PH, setAns)) }}>Calculate<span className="fa fa-ban"></span></a>
                                <div style={{ color: 'black' }}>{parseFloat(ans).toFixed(4)}</div>
                            </div>
                        </form>
                    </div>
                    {(facts.length <= 100) ? (<div className="card">
                        <div id="circle"></div>
                        <h2>Facts</h2>
                        <p>{facts[count].Fact}</p>
                        <div className="content">
                            <a onClick={(e) => setCount(count + ((Math.floor(Math.random() * 100))) - count)}>New Fact</a>
                        </div>
                    </div>) : (<div>No Fact</div>)}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
