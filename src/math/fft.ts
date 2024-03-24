const fft = (data: number[]) => {
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

  const evenOutput = fft(even);
  const oddOutput = fft(odd);

  const output = new Array(N);
  const factor = (2 * Math.PI) / N;

  for (let k = 0; k < halfN; k++) {
    const e = evenOutput[k];
    const o = oddOutput[k];
    const weight = Math.cos(k * factor) + Math.sin(k * factor) * -1;

    output[k] = e + o * weight;
    output[k + halfN] = e - o * weight;
  }

  return output;
};

export { fft };
