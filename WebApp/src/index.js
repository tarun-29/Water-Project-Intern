import "./styles.css";

import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as Papa from "papaparse";
import * as Plotly from "plotly.js-dist";
import _, { conforms } from "lodash";
import { oneHot, variable } from "@tensorflow/tfjs";

Papa.parsePromise = function (file) {
  return new Promise(function (complete, error) {
    Papa.parse(file, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete,
      error
    });
  });
};

const prepareData = async () => {
  const csv = await Papa.parsePromise(
    "https://raw.githubusercontent.com/tarun-29/Water-Project-Intern/master/WebApp/src/data/cleandata.csv"
  );

  return csv.data;
};


const renderScatter = (container, data, columns, config) => {
  var trace = {
    x: data.map(r => r[columns[0]]),
    y: data.map(r => r[columns[1]]),
    mode: "markers",
    type: "scatter",
    opacity: 0.7,
    marker: {
      color: "dodgerblue"
    }
  };

  var chartData = [trace];

  Plotly.newPlot(container, chartData, {
    title: config.title,
    xaxis: {
      title: config.xLabel,
    },
    yaxis: { title: config.yLabel }
  });
};

const renderScatter1 = (container, data, columns, config) => {
  var trace = {
    x: data.map(r => r[columns[0]]),
    y: data.map(r => r[columns[1]]),
    mode: "markers",
    type: "scatter",
    opacity: 0.7,
    marker: {
      color: "dodgerblue"
    }
  };

  var chartData = [trace];

  Plotly.newPlot(container, chartData, {
    title: config.title,
    xaxis: {
      title: config.xLabel,
      range: [0, 14]
    },
    yaxis: { title: config.yLabel }
  });
};

const renderPredictions = (trueValues, lmPredictions) => {
  var trace = {
    x: [...Array(trueValues.length).keys()],
    y: trueValues,
    mode: "lines+markers",
    type: "scatter",
    name: "true",
    opacity: 0.5,
    marker: {
      color: "dodgerblue"
    }
  };

  var lmTrace = {
    x: [...Array(trueValues.length).keys()],
    y: lmPredictions,
    name: "pred",
    mode: "lines+markers",
    type: "scatter",
    opacity: 0.5,
    marker: {
      color: "forestgreen"
    }
  };

  Plotly.newPlot("lm-predictions-cont", [trace, lmTrace], {
    title: "Linear Regression predictions",
    yaxis: { title: "D.O (mg/l)" }
  });
};

const VARIABLE_CATEGORY_COUNT = {
  Dummy: 10,
  Gummy: 5,
};


const normalize = tensor =>
  tf.div(
    tf.sub(tensor, tf.min(tensor)),
    tf.sub(tf.max(tensor), tf.min(tensor))
  );

const createDataSets = (data, features, categoricalFeatures, testSize) => {
  console.log("dvnvdvdknvmdflkvndfivknvlijkn")
  const X = data.map(r =>
    features.flatMap(f => {
      if (categoricalFeatures.has(f)) {
        return oneHot(!r[f] ? 0 : r[f], VARIABLE_CATEGORY_COUNT[f]);
      }
      return !r[f] ? 0 : r[f];
    })
  );
  const X_t = normalize(tf.tensor2d(X));
  const y = tf.tensor(data.map(r=>(!r.DO ? "NAN" : 7)))

  const splitIdx = parseInt((1 - testSize) * data.length, 10);

  const [xTrain, xTest] = tf.split(X_t, [splitIdx, data.length - splitIdx]);
  const [yTrain, yTest] = tf.split(y, [splitIdx, data.length - splitIdx]);
  return [xTrain, xTest, yTrain, yTest];
};

const trainLinearModel = async (xTrain, yTrain) => {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      inputShape: [xTrain.shape[1]],
      units: xTrain.shape[1],
      activation: "softmax"
    })
  );
  model.add(tf.layers.dense({ units: 1, activation: "relu" }));

  model.compile({
    optimizer: tf.train.sgd(0.01),
    loss: "meanSquaredError",
    metrics: [tf.metrics.meanAbsoluteError]
  });

  const trainLogs = [];
  const lossContainer = document.getElementById("loss-cont");
  const accContainer = document.getElementById("acc-cont");

  await model.fit(xTrain, yTrain, {
    batchSize: 32,
    epochs: 100,
    shuffle: true,
    validationSplit: 0.1,
    callbacks: {
      onEpochEnd: async (epochs, logs) => {
        trainLogs.push({
          rmse: Math.sqrt(logs.loss),
          val_rmse: Math.sqrt(logs.val_loss),
          mae: logs.meanAbsoluteError,
          val_mae: logs.val_meanAbsoluteError
        });
        tfvis.show.history(lossContainer, trainLogs, ["rmse", "val_rmse"]);
        tfvis.show.history(accContainer, trainLogs, ["mae", "val_mae"]);
      }
    }
  });

  return model;
};

const run = async () => {
  const data = await prepareData();

  renderScatter("qual-price-cont", data, ["Temp", "DO"], {
    title: "Temp vs D.O. (mg/l)",
    xLabel: "Temp",
    yLabel: "D.O. (mg/l)"
  });

  renderScatter1("livarea-price-cont", data, ["PH", "DO"], {
    title: "PH vs D.O. (mg/l)",
    xLabel: "PH",
    yLabel: "D.O. (mg/l)"
  });

  const features = [
    "PH",
    "Temp"
  ];
  const categoricalFeatures = new Set([]);

  const [xTrain, xTest, yTrain, yTest] = createDataSets(
    data,
    features,
    categoricalFeatures,
    0.1
  );

  const linearModel = await trainLinearModel(xTrain, yTrain);

  const trueValues = yTest.dataSync();
  const lmPreds = linearModel.predict(xTest).dataSync();
  console.log(trueValues)
  console.log(lmPreds)

  renderPredictions(trueValues, lmPreds);
};

if (document.readyState !== "loading") {
  run();
} else {
  document.addEventListener("DOMContentLoaded", run);
}