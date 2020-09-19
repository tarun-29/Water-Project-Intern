import * as tf from "@tensorflow/tfjs"

const modelUrl =  "https://raw.githubusercontent.com/tarun-29/Water-Project-Intern/master/tfjs/model.json"

const model = await tf.loadLayersModel(modelUrl);


const prediction = model.predict(example);