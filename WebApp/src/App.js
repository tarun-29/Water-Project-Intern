import React from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs"
import Homepage from './Components/Homepage';

function App() {
  return (
    <div id="canvas-wrap">
      <canvas id="canvas"></canvas>
      <div id="overlay">
        <Homepage/>
      </div>
    </div>
  );
}

export default App;
