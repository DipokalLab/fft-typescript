import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { LineGraph } from "./components/Graph";
import { fft, ifft, istft, stft } from "./math/fft";
import { dft } from "./math/dft";
import { Complex } from "./math/complex";

function App() {
  const [data, setData] = useState([new Complex(0, 0)]);
  const [fftData, setFFTData] = useState([new Complex(0, 0)]);
  const [ifftData, setIFFTData] = useState([new Complex(0, 0)]);
  const [dftData, setDFTData] = useState([new Complex(0, 0)]);

  const [stftData, setSTFTData] = useState([[new Complex(0, 0)]]);
  const [istftData, setISTFTData] = useState([new Complex(0, 0)]);

  const getSinWave = () => {
    let arr = [];
    //128
    for (let index = 0; index < 2 ** 9; index++) {
      arr.push(Math.sin((index / 30) ** 2));
    }

    return arr;
  };

  useEffect(() => {
    setIFFTData(ifft(fftData));
  }, [fftData]);

  useEffect(() => {
    setISTFTData(istft(stftData));
  }, [stftData]);

  useEffect(() => {
    const arr = getSinWave();
    setData(arr.map((item) => new Complex(item, 0)));
    setDFTData(
      dft(arr).map((item) => {
        return new Complex(item, 0);
      })
    );
    setFFTData(fft(arr));

    setSTFTData(stft(arr));

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
      <LineGraph title="IFFT" data={ifftData}></LineGraph>
      <hr />
      {stftData.map((arr, step) => (
        <LineGraph title={"STFT_" + step} data={arr}></LineGraph>
      ))}
      <hr />
      <LineGraph title="ISTFT" data={istftData}></LineGraph>
    </div>
  );
}

export default App;
