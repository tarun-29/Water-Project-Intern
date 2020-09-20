import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// import * as tf from "@tensorflow/tfjs"

// const modelUrl = "https://raw.githubusercontent.com/tarun-29/Water-Project-Intern/master/tfjs/model.json"

// const model = async () => {
//   await tf.loadLayersModel(modelUrl).then(m => {
//     // data = tf.tensor2d([30.6, 7.5], [1, 2])
//     // console.log(m.predict(tf.ones([30.6], [7.5])))
//     var results = m.predict(tf.tensor2d([28, 7.5], [1, 2]));
//     console.log(results.dataSync())
//   })

// }

// // const prediction = async (example)=>{
// //   await model.predict(tf.tensor2d([30.6, 7.5], [1,2]));
// // }

// console.log("Predictions**************************")
// model()