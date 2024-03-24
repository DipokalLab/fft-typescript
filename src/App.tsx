import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { LineGraph } from "./components/Graph";
import { fft } from "./math/fft";
import { dft } from "./math/dft";

function App() {
  const [data, setData] = useState([0]);
  const [fftData, setFFTData] = useState([0]);
  const [dftData, setDFTData] = useState([0]);

  const getSinWave = () => {
    let arr = [];
    //128
    for (let index = 0; index < 2 ** 7; index++) {
      arr.push(Math.sin(index / 10));
    }

    return arr;
  };

  useEffect(() => {
    const arr = getSinWave();
    setData(arr);
    setDFTData(dft(arr));
    setFFTData(fft(arr));

    // let count = 0;
    // setInterval(() => {
    //   if (data.length >= 100) data.shift();
    //   setData([...data]);
    //   count += 0.1;
    // }, 100);
  }, []);

  return (
    <div>
      <LineGraph title="Sin Wave" data={data}></LineGraph>
      <LineGraph title="DFT" data={dftData}></LineGraph>
      <LineGraph title="FFT" data={fftData}></LineGraph>
    </div>
  );
}

export default App;
