import { Complex } from "./complex";

const stft = (data: number[]) => {
  const windowSize = 16;
  const padding = 8;
  const valueArr = [];

  for (
    let index = windowSize;
    index < data.length + 1;
    index = index + padding
  ) {
    const startPoint = index - windowSize;
    const endPoint = index;
    const splitData = data.slice(startPoint, endPoint);
    const fftData = fft(splitData);
    valueArr.push(fftData);
  }

  return valueArr;
};

// note: istft
const istft = (data: Complex[][]): Complex[] => {
  const windowSize = 16;
  const padding = 8;
  const valueArr: Complex[] = new Array(
    data.length * windowSize - (windowSize - padding) * (data.length - 1)
  ).fill(new Complex(0, 0));

  for (let index = 0; index < valueArr.length; index++) {
    valueArr[index] = new Complex(0, 0);
  }

  const inversedArr = [];

  //console.log(data.length);

  for (let index = 0; index < data.length; index++) {
    const startPoint = index * (windowSize - padding);
    const endPoint = startPoint + windowSize;
    const inversed = ifft(data[index]);
    //console.log(index, inversed);
    inversedArr.push(inversed);
  }

  console.log(valueArr, inversedArr);

  let count = 0;

  for (let arrX = 0; arrX < inversedArr.length; arrX++) {
    for (let arrY = 0; arrY < inversedArr[arrX].length; arrY++) {
      //inversedArr[arrX][arrY].re;
      valueArr[count].re = inversedArr[arrX][arrY].re;
      count += 1;
    }
  }

  // for (let index = 0; index < valueArr.length; index++) {
  //   //console.log(Math.floor(index / 8));
  //   if (Math.floor(index / 8) <= 31) {
  //     valueArr[index].re = inversedArr[Math.floor(index / 8)][index % 8].re;
  //   }
  // }

  return valueArr;
};

const fft = (data: number[]): Complex[] => {
  const result = fftCalc(data);
  return result.slice(0, result.length / 2);
};

const ifft = (data: Complex[]): Complex[] => {
  try {
    return ifftCalc(data);
  } catch (error) {
    return [new Complex(0, 0)];
  }
};

function ifftCalc(data: Complex[]) {
  let N = data.length;
  let iN = 1 / N;

  for (let i = 0; i < N; ++i) {
    if (data[i]) {
      data[i].im = -data[i].im;
    }
  }

  const realData = data.map((item) => {
    return item.re;
  });

  data = fftCalc(realData);

  for (let i = 0; i < N; ++i) {
    data[i].im = -data[i].im;
    data[i].re *= iN;
    data[i].im *= iN;
  }
  return data;
}

const fftCalc = (data: number[]) => {
  let N = data.length;

  if (N === 1) {
    return data;
  }

  const halfN = N / 2;
  let even: number[] = [];
  let odd: number[] = [];

  data.map((item: any, index: any) => {
    if (index % 2 == 0) {
      even.push(item);
    } else {
      odd.push(item);
    }
  });

  const evenOutput = fftCalc(even);
  const oddOutput = fftCalc(odd);

  const output = new Array(N);

  const a = -2 * Math.PI;

  for (var k = 0; k < halfN; ++k) {
    if (!(evenOutput[k] instanceof Complex))
      evenOutput[k] = new Complex(evenOutput[k], 0);
    if (!(oddOutput[k] instanceof Complex))
      oddOutput[k] = new Complex(oddOutput[k], 0);
    const p = k / N;
    const t = new Complex(0, a * p);
    t.cexp(t).mul(oddOutput[k], t);

    output[k] = evenOutput[k].add(t, oddOutput[k]);
    output[k + halfN] = evenOutput[k].sub(t, evenOutput[k]);
  }

  return output;
};

export { fft, ifft, stft, istft };
